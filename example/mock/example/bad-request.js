module.exports = () => ({
  method: 'post',
  path: '/example/bad-request',
  middleware: async (ctx, next) => {
    ctx.status = 400;
    ctx.body = {
      code: '8888',
      msg: '请求参数错误'
    };
  }
});
