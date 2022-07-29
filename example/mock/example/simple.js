/**
 * GET 请求示例
 */
module.exports = () => ({
  middleware: async (ctx, next) => {
    // console.log(ctx.request.querystring);
    // console.log(ctx.request.query);
    ctx.body = {
      foo: 'bar',
      list: [1, 2, 3, 4, 5]
    };
  }
});
