import Koa from 'koa'
import Router from '@koa/router'
import path from 'path'
import fs from 'fs'
import junk from 'junk'
import klaw from 'klaw'
import upath from 'upath'
import chalk from 'chalk'
import _ from 'lodash'
//@ts-ignore
import { mock } from 'mockjs-lite'
import chokidar from 'chokidar'
import json5 from 'json5'

const log = console.log
const logSuccess = (...args: any[]) => console.log(chalk.green(...args))
const logWarning = (...args: any[]) => console.log(chalk.yellow(...args))
const logError = (...args: any[]) => console.log(chalk.red(...args))

/**
 * 过滤垃圾文件，保留符合 suffixRegExp 正则后缀的文件
 */
const filterBySuffix = (filename: string, suffixRegExp: RegExp) =>
  suffixRegExp.test(path.extname(filename)) && junk.not(filename)

/**
 * 过滤垃圾文件，保留 JS 文件
 */
const filterJavaScript = (filename: string) => filterBySuffix(filename, /\.js$/i)

/**
 * 过滤垃圾文件，保留 JSON 文件
 */
const filterJSON = (filename: string) => filterBySuffix(filename, /\.json$/i)

/**
 * 判断是否是非隐藏文件
 */
const isNonHidden = (filename: string) => {
  const basename = path.basename(filename)
  return basename === '.' || basename[0] !== '.'
}

const routeExtNames = ['.js', '.json', '.mjs', '.ts']

/**
 * 从文件名生成路由名
 *
 * @example
 * ```
 * getRoutePathFromFilename(
 *   'C:\\Users\\19040892\\workspace\\sffe-h5\\packages\\suning-mobile\\mock\\apis\\example\\get.js',
 *   'C:\\Users\\19040892\\workspace\\sffe-h5\\packages\\suning-mobile\\mock\\apis'
 * ) => '/example/get'
 *
 * getRoutePathFromFilename(
 *   'C:\\Users\\19040892\\workspace\\sffe-h5\\packages\\suning-mobile\\mock\\apis\\example\\get.js',
 * ) => '/apis/example/get'
 *
 * getRoutePathFromFilename(
 *   'C:\\Users\\19040892\\workspace\\sffe-h5\\packages\\suning-mobile\\apis\\legacy\\getCategoryList.do\\data.json'
 * ) => '/legacy/getCategoryList.do'
 * ```
 */
const getRoutePathFromFilename = (filename: string, baseFilename = '.') => {
  const relativePath = path.relative(baseFilename, filename)
  const dirname = path.dirname(relativePath)
  const extname = path.extname(relativePath)
  const basename = routeExtNames.includes(extname) ? path.basename(relativePath, extname) : path.basename(relativePath)
  return upath.normalize(path.join('/', dirname, basename))
}

/**
 * 开头追加斜杠
 */
export const appendLeadingSlash = (pathname: string) => path.posix.join('/', pathname)

/**
 * 递归遍历 rootPath 下所有文件夹、文件，返回文件路径名称列表
 */
const walkdir = (rootPath: string, filter = () => true) =>
  new Promise<string[]>((resolve, reject) => {
    const paths: string[] = []
    klaw(rootPath, { filter: isNonHidden })
      .on('data', item => {
        paths.push(item.path)
      })
      .on('error', (err: Error, item: klaw.Item) => {
        logError('[walkdir]', err.message)
        logError('[walkdir]', item.path)
        reject(err)
      })
      .on('end', () => {
        resolve(paths.filter(filter))
      })
  })

/**
 * 检查 router 是否已经注册过指定 path 的 route
 */
const isRoutePathRegistered = (router: Router, routePath: string) =>
  router.stack.map(item => item.path).includes(routePath)

/**
 * 增加内部 route
 */
const addInternalRoutes = (router: Router) => {
  router.get('/mock-api/list', async (ctx, _next) => {
    // TODO: 支持过滤
    ctx.body = {
      code: 0,
      data: router.stack.map(item => ({
        path: item.path,
        methods: item.methods
      })),
      msg: 'OK'
    }
  })
}

/**
 * 自动扫描 basePath 文件或文件夹下的 JS、JSON
 */
const scanRoutes = async (basePath: string) => {
  const apiFilePaths: string[] = []
  const stats = fs.statSync(basePath)
  if (stats.isFile()) {
    apiFilePaths.push(basePath)
  } else {
    const folderPath = stats.isDirectory() ? basePath : path.basename(basePath)
    const folderPaths = await walkdir(folderPath)
    apiFilePaths.push(...folderPaths)
  }

  const jsPaths = apiFilePaths.filter(filterJavaScript)
  const jsonPaths = apiFilePaths.filter(filterJSON)

  return {
    jsPaths,
    jsonPaths
  }
}

/**
 * 移除 routes
 */
const removeRoutes = (router: Router, routePath: string) => {
  const targetRoute = router.stack.reduce(
    (prev, curr, currIndex) => {
      if (curr.path === routePath) {
        prev.count++
        if (prev.index === -1) {
          prev.index = currIndex
        }
      }
      return prev
    },
    { count: 0, index: -1 }
  )
  router.stack.splice(targetRoute.index, targetRoute.count)
}

interface RegisterRoutesOptions {
  rootPath: string
  jsPaths: string[]
  jsonPaths: string[]
}

type Method = 'get' | 'post' | 'put' | 'link' | 'unlink' | 'delete' | 'del' | 'head' | 'options' | 'patch' | 'all'

interface Route {
  path?: string
  middleware: Router.Middleware
  method?: Method | Method[]
}

/**
 * 注册 route
 */
const registerRoutes = (
  router: Router<Koa.DefaultState, Koa.DefaultContext>,
  { rootPath, jsPaths = [], jsonPaths = [] }: RegisterRoutesOptions
) => {
  // JS 模块
  jsPaths.forEach(jsPath => {
    const createRoute = require(jsPath)
    if (_.isFunction(createRoute)) {
      const route = createRoute({ router, mock })

      // 1. 自定义，要求自定义 route 不能返回对象
      if (!route) {
        // TODO: 检查已经注册的路由
        log(`[scanApis] Create a custom route: see "${jsPath}"`)
        return
      }

      // 2. mockjs 简化用法
      if (route && !_.isFunction(route.middleware)) {
        const routePath = getRoutePathFromFilename(jsPath, rootPath)
        const method = 'all'

        // 路由替换
        if (isRoutePathRegistered(router, routePath)) {
          logWarning(`[registerRoutes] Route "${routePath}" has already been registered, it will be reload`)
          removeRoutes(router, routePath)
        }

        router[method](routePath, ctx => {
          ctx.jsonp = mock(route)
        })
        log(`[scanApis] Create a JS route: ${method.toUpperCase()} ${routePath}`)
      }

      // 3. 标准用法
      // 支持在一个模块中同时定义多个 route
      const routes: Route[] = Array.isArray(route) ? route : [route]
      routes.forEach(routeItem => {
        if (routeItem.middleware) {
          const routePath = routeItem.path || getRoutePathFromFilename(jsPath, rootPath)
          const method = routeItem.method || 'all'

          // 路由替换
          if (isRoutePathRegistered(router, routePath)) {
            logWarning(`[registerRoutes] Route "${routePath}" has already been registered, it will be reload`)
            removeRoutes(router, routePath)
          }

          // 支持 method 定义为数组
          if (Array.isArray(method)) {
            method.forEach(methodItem => {
              router[methodItem](routePath, routeItem.middleware)
            })
          } else {
            router[method](routePath, routeItem.middleware)
          }

          log(
            `[scanApis] Create a JS route: ${
              Array.isArray(method) ? method.map(m => m.toUpperCase()).join('/') : method.toUpperCase()
            } ${routePath}`
          )
        }
      })
    } else {
      // TODO: 支持 Promise ？
      logWarning(`[scanApis] Please check the module "${jsPath}"`)
    }
  })

  // JSON 模块
  jsonPaths.forEach(jsonPath => {
    // 支持 JSON/JSONC/JSON5
    const content = fs.readFileSync(jsonPath, 'utf-8')
    const json = json5.parse(content)

    let routePath = ''

    // 兼容 express-mockjs
    // 如果 JSON 名为 data.json，则尝试解析 JSDoc，若失败根据父级路径生成接口路径
    if (path.basename(jsonPath) === 'data.json') {
      const commentURL = parseJSDocURL(content)
      if (commentURL) {
        routePath = appendLeadingSlash(commentURL)
      } else {
        routePath = getRoutePathFromFilename(path.resolve(jsonPath, '..'), rootPath)
      }
    } else {
      routePath = getRoutePathFromFilename(jsonPath, rootPath)
    }

    // 路由替换
    if (isRoutePathRegistered(router, routePath)) {
      logWarning(`[registerRoutes] Route "${routePath}" has already been registered, it will be reload`)
      removeRoutes(router, routePath)
    }

    router.all(routePath, ctx => {
      ctx.jsonp = mock(json)
    })
    log(`[scanApis] Create a JSON route: ${routePath}`)
  })
}

type Listener = (path: string, stats?: fs.Stats) => void

/**
 * 监控 rootPath 文件夹下的 JS、JSON 文件变化
 */
const watchRoutes = (rootPath: string, listener: Listener) => {
  const watcher = chokidar.watch(rootPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  watcher.on('change', (path, stats) => {
    if (filterJavaScript(path) || filterJSON(path)) {
      listener(path, stats)
    }
  })
}

/** `@url /foo/bar` 正则表达式 */
export const regexpTagURL = /@url\s([\w\/-]+)\b/i

/**
 * 解析 JSDoc 中的 `@url` 地址
 */
export const parseJSDocURL = (comment = '') => {
  const [_, url] = regexpTagURL.exec(comment) || []
  return url || ''
}

export {
  log,
  logSuccess,
  logWarning,
  logError,
  filterJavaScript,
  filterJSON,
  getRoutePathFromFilename,
  isRoutePathRegistered,
  walkdir,
  addInternalRoutes,
  scanRoutes,
  removeRoutes,
  registerRoutes,
  watchRoutes
}
