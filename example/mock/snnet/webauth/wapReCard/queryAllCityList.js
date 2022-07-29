/**
 * 查询全部城市
 */
module.exports = () => ({
  method: 'get',
  path: '/webauth/wapReCard/queryAllCityList',
  middleware: async (ctx, next) => {
    ctx.body = {
      code: '000000',
      msg: '处理成功',
      data: {
        cityList: [
          {
            provId: '110000',
            provName: '北京',
            cityId: '110100',
            cityCode: '110100',
            cityName: '北京'
          },
          {
            provId: '310000',
            provName: '上海',
            cityId: '310100',
            cityCode: '310100',
            cityName: '上海'
          },
          {
            provId: '120000',
            provName: '天津',
            cityId: '120100',
            cityCode: '120100',
            cityName: '天津'
          },
          {
            provId: '500000',
            provName: '重庆',
            cityId: '500100',
            cityCode: '500100',
            cityName: '重庆'
          },
          {
            provId: '440000',
            provName: '广东',
            cityId: '440100',
            cityCode: '440100',
            cityName: '广州'
          },
          {
            provId: '330000',
            provName: '浙江',
            cityId: '330100',
            cityCode: '330100',
            cityName: '杭州'
          },
          {
            provId: '340000',
            provName: '安徽',
            cityId: '340100',
            cityCode: '340100',
            cityName: '合肥'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '320100',
            cityCode: '320100',
            cityName: '南京'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '320200',
            cityCode: '320200',
            cityName: '无锡'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '320300',
            cityCode: '320300',
            cityName: '徐州'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '320400',
            cityCode: '320400',
            cityName: '常州'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '320500',
            cityCode: '320500',
            cityName: '苏州'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '320600',
            cityCode: '320600',
            cityName: '南通'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '321000',
            cityCode: '321000',
            cityName: '扬州'
          },
          {
            provId: '320000',
            provName: '江苏',
            cityId: '321200',
            cityCode: '321200',
            cityName: '泰州'
          }
        ]
      }
    };
  }
});
