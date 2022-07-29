/**
 * GET 请求示例
 */
module.exports = () => ({
  method: 'get',
  path: '/example/get',
  middleware: async (ctx, next) => {
    // console.log(ctx.request.querystring);
    // console.log(ctx.request.query);
    ctx.body = {
      foo: 'bar',
      list: [1, 2, 3, 4, 5],
      date: new Date().toISOString()
    };
  }
});
