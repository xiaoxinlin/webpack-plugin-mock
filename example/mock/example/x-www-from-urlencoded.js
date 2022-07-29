/**
 * POST 请求示例 (application/x-www-from-urlencoded)
 */
module.exports = () => ({
  method: 'post',
  path: '/example/x-www-from-urlencoded',
  middleware: async (ctx, next) => {
    // console.log(ctx.request.body);
    ctx.body = { foo: 'bar' };
  }
});
