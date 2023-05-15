#!/usr/bin/env node
import path from 'path'
import meow from 'meow'
import { existsSync } from 'fs'
import { serve } from './server'
import { MockServerConfig } from './types'

const cli = meow(
  `
    Usage
      $ mock-server

    Options
      --port, -p  Mock 服务的启动端口
      --config, -c  Mock 服务的启动配置
      --api-base-path  Mock 服务 API 目录
      --pretty  是否对 JSON Response 美化
      --watch, -w  是否监控 API 目录文件变化

    Examples
      $ mock-server --port 8090
      $ mock-server --api-base-path ./mock/apis
      $ mock-server --config ./config/mock.config.js
      $ mock-server --watch --api-base-path ./mock/apis
`,
  {
    flags: {
      port: {
        type: 'number',
        default: 8090,
        alias: 'p'
      },
      config: {
        type: 'string',
        default: 'mock.config.js',
        alias: 'c'
      },
      apiBasePath: {
        type: 'string',
        default: 'mock'
      },
      pretty: {
        type: 'boolean',
        default: true
      },
      watch: {
        type: 'boolean',
        default: false,
        alias: 'w'
      }
    }
  }
)

// 路径解析时相对于命令行
const cliPath = process.cwd()
const apiBasePath = path.resolve(cliPath, cli.flags.apiBasePath)
const configFileName = path.resolve(cliPath, cli.flags.config)

const configObject: MockServerConfig = {
  port: cli.flags.port,
  apiBasePath,
  pretty: cli.flags.pretty,
  watch: cli.flags.watch
}

type MockServerConfigType = MockServerConfig | (() => Promise<MockServerConfig> | MockServerConfig)

const bootstrap = async () => {
  if (existsSync(configFileName)) {
    const configModule: MockServerConfigType = require(configFileName)
    const config = typeof configModule === 'function' ? await configModule() : configModule
    Object.assign(configObject, config)
  }

  serve(configObject)
}

bootstrap()
