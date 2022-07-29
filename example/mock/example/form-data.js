/**
 * POST 请求示例 (multipart/form-data)
 */
module.exports = () => ({
  method: 'post',
  path: '/example/form-data',
  middleware: async (ctx, next) => {
    // console.log(ctx.request.files);
    // console.log(ctx.request.body);
    ctx.body = { foo: 'bar' };
  }
});
