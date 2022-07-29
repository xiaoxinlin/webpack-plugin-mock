/**
 * 登录
 */
module.exports = () => ({
  method: 'get',
  path: '/ids/login',
  middleware: async (ctx, next) => {
    ctx.body = `login`;
  }
});
