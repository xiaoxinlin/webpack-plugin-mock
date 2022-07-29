const { mock } = require('mockjs-lite');

/**
 * 上传收货信息
 */
module.exports = () => ({
  method: 'post',
  path: '/webauth/wapReCard/addConsigneeInfo',
  middleware: async (ctx, next) => {
    ctx.body = mock({
      code: '000000',
      msg: '处理成功',
      data: null
    });
  }
});
