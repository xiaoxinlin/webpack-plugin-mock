export type Options = {
  /** Mock 启动端口 */
  port: number;
  /** Mock API 目录 */
  apiBasePath: string;
  /** 是否格式化响应的 JSON */
  pretty: boolean;
  /** 是否监控 API 目录文件变化 */
  watch: boolean;
}
