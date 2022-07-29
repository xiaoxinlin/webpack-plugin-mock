/**
 * 图片上传-多张图片上传
 * http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20201014000051
 */
module.exports = () => ({
  method: 'post',
  path: '/merchant/common/upload/multiImage',
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
    const images = Array.isArray(files.images) ? files.images : [files.images];
    // 不需要真的保存图片返回 URL，只需要根据数量返回占位图片
    const imageUrls = images.map(() => 'http://placehold.it/400x400');
    ctx.body = {
      code: '000000',
      msg: 'OK',
      data: imageUrls
    };
  }
});
