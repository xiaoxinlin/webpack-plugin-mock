/**
 * 区域模式-查询街区下自提点
 * @see http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20210105000040
 */
module.exports = () => ({
  method: 'post',
  path: '/xtpis-web/businessmap/areamodel/private/getPickupListByStreetCode.do',
  middleware: async (ctx, next) => {
    ctx.body = {
      code: '000000',
      msg: null,
      data: {
        streetCoverRateData: {
          rateToday: null,
          streetName: null,
          extendDataList: [{}],
          totalSales: null,
          perSales: null,
          pointAvgNum: null,
        },
        pickupPointList: [
          {
            pickupName: null,
            pickupCode: null,
            pickups: [{}],
            pickupStatus: null,
            compRate: null,
            isSatisfy: null,
            expand: null,
            pinkupUrl: null,
            pickupAddress: null,
            examineStatus: null,
            applicationTime: null,
            areaProtection: null,
          },
        ],
      },
    };
  },
});
