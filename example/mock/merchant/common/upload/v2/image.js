/**
 * 图片上传（带场景）
 * http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20200720000038
 */
module.exports = () => ({
  method: 'post',
  path: '/merchant/common/upload/v2/image',
  middleware: async (ctx, next) => {
    const { files, body } = ctx.request;
    if (!files.images || !body.scene) {
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
