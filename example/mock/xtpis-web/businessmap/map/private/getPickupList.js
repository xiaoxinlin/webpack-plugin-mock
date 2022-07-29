/**
 * 地图模式-根据经纬度查询周边自提点列表
 * @see http://mk.cnsuning.com/umsm/interfaceInfo/shareInterface.htm?interfaceCode=I20210115000047
 */
module.exports = () => ({
  path: '/xtpis-web/businessmap/map/private/getPickupList.do',
  middleware: async (ctx, next) => {
    ctx.body = {
      code: '000000',
      msg: null,
      data: [
        {
          storeName: '南京测试苏宁小店自提点',
          storeCode: '0001',
          applyNo: '1234567890',
          storeType: ['自营', '便利店'],
          verifyStatus: '3',
          pickupPointStatus: 'ZT001',
          detailAddr:
            '江苏省南京市栖霞区迎春路17号红花地小区18红花地小区18栋2单元',
          locLng: 118.790108,
          locLat: 32.044442,
        },
        {
          storeName: '南京聚宝山庄苏宁小店',
          storeCode: '0002',
          applyNo: '1234567891',
          storeType: ['自营', '便利店'],
          verifyStatus: '3',
          pickupPointStatus: 'ZT000',
          detailAddr: '江苏南京市聚宝山山庄凤霞街788号',
          locLng: 118.80026,
          locLat: 32.04635,
        },
        {
          storeName: '吉祥混沌南京和燕路分店',
          storeCode: '0003',
          applyNo: '1234567892',
          storeType: ['免费点', '便利店'],
          verifyStatus: '3',
          pickupPointStatus: 'ZT002',
          detailAddr: '江苏南京市聚宝山山庄凤霞街788号',
          locLng: 118.793627,
          locLat: 32.04928,
        },
        {
          storeName: '南京二杆子水果便利店',
          storeCode: '0004',
          applyNo: '1234567893',
          storeType: ['授权点', '便利店'],
          verifyStatus: '2',
          pickupPointStatus: '',
          detailAddr: '江苏省南京市和燕路175号-17',
          locLng: 118.8014,
          locLat: 32.04835,
        },
        {
          storeName: '南京张王立烟酒店',
          storeCode: '0005',
          applyNo: '1234567894',
          storeType: ['自营', '便利店'],
          verifyStatus: '2',
          pickupPointStatus: '',
          detailAddr: '江苏省南京市和燕路175号-17',
          locLng: 118.792554,
          locLat: 32.052553,
        },
        {
          storeName: '阿信水果便利店',
          storeCode: '0006',
          applyNo: '1234567895',
          storeType: ['自营', '便利店'],
          verifyStatus: '1',
          pickupPointStatus: '',
          detailAddr: '江苏省南京市和燕路175号-17',
          locLng: 118.797414,
          locLat: 32.04426,
        },
        {
          storeName: '海燕水果店',
          storeCode: '0007',
          applyNo: '1234567896',
          storeType: ['自营', '便利店'],
          verifyStatus: '3',
          pickupPointStatus: 'ZT002',
          detailAddr: '江苏省南京市和燕路175号-17',
          locLng: 118.797725,
          locLat: 32.041332,
        },
      ],
    };
  },
});
