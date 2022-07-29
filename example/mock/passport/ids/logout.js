/**
 * 退出登录
 */
module.exports = () => ({
  method: 'get',
  path: '/ids/logout',
  middleware: async (ctx, next) => {
    ctx.body = `logout`;
  }
});
