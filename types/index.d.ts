export = WebpackPluginMock;
declare class WebpackPluginMock {
  /**
   * @param {Options} options
   */
  constructor(options?: Options);
  options: import('./options').Options;

}
declare namespace WebpackPluginMock {
  export { Options };
}
type Options = import('./options').Options;
