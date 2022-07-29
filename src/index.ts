import { serve } from './server'
import { MockServerConfig } from './types'

class WebpackPluginMock {
  private readonly config: MockServerConfig
  constructor(config: MockServerConfig) {
    this.config = config
  }

  apply() {
    serve(this.config)
  }
}

module.exports = WebpackPluginMock
