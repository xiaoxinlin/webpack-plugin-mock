/**
 * 同时支持 GET/POST 示例
 */
module.exports = () => ({
  method: 'all',
  path: '/example/all',
  middleware: async (ctx, next) => {
    // console.log(ctx.request.method);
    // console.log(ctx.request.querystring);
    // console.log(ctx.request.query);
    ctx.body = {
      foo: 'bar',
      list: [1, 2, 3, 4, 5]
    };
  }
});
