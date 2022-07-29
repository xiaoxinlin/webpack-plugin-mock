/**
 * 上传图片
 * http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20200323000036
 */
module.exports = () => ({
  method: 'post',
  path: '/merchant/common/upload/image',
  middleware: async (ctx, next) => {
    const { files } = ctx.request;
    if (!files.images) {
      ctx.status = 400;
      ctx.body = {
        code: '-1',
        msg: '参数错误'
      };
      return;
    }
    ctx.body = {
      code: '000000',
      msg: 'OK',
      data: 'http://placehold.it/400x400'
    };
  }
});
