/**
 * 上传图片[申请微信和聚合账户]
 * http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20200603000004
 */
module.exports = () => ({
  method: 'post',
  path: '/merchant/common/upload/image4ApplyAccount',
  middleware: async (ctx, next) => {
    const { files, body } = ctx.request;
    if (!files.images || !body.picType || !body.signPlatform) {
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
