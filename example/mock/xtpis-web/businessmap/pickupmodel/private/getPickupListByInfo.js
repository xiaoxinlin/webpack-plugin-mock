/**
 * 自提点模式-多维度查询自提点列表
 * @see http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20210105000039
 */
module.exports = () => ({
  method: 'post',
  path: '/xtpis-web/businessmap/pickupmodel/private/getPickupListByInfo.do',
  middleware: async (ctx, next) => {
    ctx.body = {
      code: '000000',
      msg: null,
      data: {
        pickupPointList: [
          {
            pickupName: null,
            pickupCode: null,
            pickups: [],
            pickupStatus: null,
            compRate: null,
            isSatisfy: null,
            expand: null,
            pinkupUrl: null,
            pickupAddress: null,
          },
        ],
      },
    };
  },
});
