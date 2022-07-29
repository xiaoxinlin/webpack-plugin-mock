const { mock } = require('mockjs-lite');

/**
 * 上传号卡信息
 */
module.exports = () => ({
  method: 'post',
  path: '/webauth/wapReCard/submitPhoneNumInfo',
  middleware: async (ctx, next) => {
    ctx.body = mock({
      code: '000000',
      msg: '处理成功',
      data: {
        processFlag: '2',
        orderId: '@uuid'
      }
    });
  }
});
