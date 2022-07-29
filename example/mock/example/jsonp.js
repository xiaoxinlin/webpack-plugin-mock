/**
 * GET 请求示例 (JSONP)
 */
module.exports = () => ({
  method: 'get',
  path: '/example/jsonp',
  middleware: async (ctx, next) => {
    // console.log(ctx.request.querystring);
    // console.log(ctx.request.query);
    ctx.jsonp = { foo: 'bar' };
  }
});
