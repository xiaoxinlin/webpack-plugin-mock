/**
 * 登录验证
 */
module.exports = () => ({
  method: 'get',
  path: '/authStatus',
  middleware: async (ctx, next) => {
    // ctx.status = 500;
    ctx.jsonp = {
      authStatusResponse: true,
      hasLogin: true,
      principal: '1234567890'
    };
  }
});
