/**
 * BD查询街区首条信息
 * @see http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20210125000160
 */
module.exports = () => ({
  path: '/xtpis-web/businessmap/map/private/getNaturalStreet.do',
  middleware: async (ctx, next) => {
    ctx.body = {
      code: '000000',
      msg: null,
      data: {
        naturalStreetCode: '',
        naturalStreetName: '',
        lng: 118.790108,
        lat: 32.044442,
      },
    };
  },
});
