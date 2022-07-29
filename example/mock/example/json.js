/**
 * POST 请求示例 (application/json)
 */
module.exports = () => ({
  method: 'post',
  path: '/example/json',
  middleware: async (ctx, next) => {
    // console.log(ctx.request.body);
    ctx.body = { foo: 'bar' };
  }
});
