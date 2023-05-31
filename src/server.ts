import { debounce } from 'lodash'
import path from 'path'
import address from 'address'
import Koa from 'koa'
import cors from '@koa/cors'
import Router from '@koa/router'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import json from 'koa-json'
import jsonp from 'koa-safe-jsonp'
import koaStatic from 'koa-static'
import { logError, logSuccess, logWarning, addInternalRoutes, scanRoutes, registerRoutes, watchRoutes } from './utils'
import { MockServerConfig } from './types'

let defaultConfig: MockServerConfig = {} as MockServerConfig

const serve = async (config: MockServerConfig) => {

  defaultConfig = config

  const app = new Koa()
  const router = new Router()

  const __DEV__ = process.env.NODE_ENV === 'development'
  const publicBasePath = path.resolve(__dirname, '../public')

  __DEV__ && console.log('[mock] config', config)

  jsonp(app, {
    callback: 'callback',
    limit: 50
  })

  /**
   * logger 最外层调用
   * json pretty 次外层，方便格式化 response
   * cors 次次外层，收到请求优先处理 CORS
   * 先调用 koa-body 再调用 koa-router
   */
  app.use(logger())
  if (config.pretty) {
    app.use(
      json({
        pretty: true,
        spaces: 2
      })
    )
  }
  app.use(
    cors({
      credentials: true
    })
  )
  app.use(
    koaBody({
      multipart: true
    })
  )
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(koaStatic(publicBasePath))

  addInternalRoutes(router)

  try {
    // 自动扫描 apis 文件夹下 JS、JSON，添加为 route
    const { jsPaths, jsonPaths } = await scanRoutes(config.apiBasePath)
    registerRoutes(router, {
      rootPath: config.apiBasePath,
      jsPaths,
      jsonPaths
    }, defaultConfig)
  } catch (err) {
    logError(err)
  }

  /**
   * apis 文件变化回调
   */
  const onRoutesChange = async (filePath: string) => {
    const { jsPaths, jsonPaths } = await scanRoutes(filePath)
    const routePaths = [...jsPaths, ...jsonPaths]
    routePaths.forEach(routePath => {
      logWarning(`[onRoutesChange] "${require.resolve(routePath)}" will be reload`)
      delete require.cache[require.resolve(routePath)]
    })
    registerRoutes(router, {
      rootPath: config.apiBasePath,
      jsPaths,
      jsonPaths
    }, defaultConfig)
  }

  const onRoutesChangeDebounced = debounce(onRoutesChange, 1000)

  // 监控 apis 文件变化
  if (config.watch) {
    logSuccess(`[mock] Watch "${config.apiBasePath}"`)
    watchRoutes(config.apiBasePath, onRoutesChangeDebounced)
  }

  app.on('error', (err, ctx) => {
    logError('[mock] server error', err, ctx)
  })

  app.listen(config.port)

  logSuccess(`[mock] Mock server is running at ${config.port}`)
  logSuccess(`[mock] LOCAL http://localhost:${config.port}`)
  logSuccess(`[mock] LAN  http://${address.ip()}:${config.port}`)
  logSuccess(`[mock] api list http://${address.ip()}:${config.port}/mock-api/list`)

  return {
    app,
    router
  }
}

export { serve }
