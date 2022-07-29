const test = require('ava');
const { getRoutePathFromFilename, parseJSDocURL } = require('../lib/utils');

test('getRoutePathFromFilename', async t => {
  const routePath = getRoutePathFromFilename(
    'C:\\Users\\19040892\\workspace\\sffe-h5\\packages\\suning-mobile\\mock\\apis\\example\\get.js',
    'C:\\Users\\19040892\\workspace\\sffe-h5\\packages\\suning-mobile\\mock\\apis'
  );
  t.is(routePath, '/example/get');
});


test('generateRoutePath', t => {
  const routePath = generateRoutePath(
    'C:\\Users\\keqingrong\\workspace\\example\\mock\\apis\\example\\get.js',
    'C:\\Users\\keqingrong\\workspace\\example\\mock\\apis'
  );
  t.is(routePath, '/example/get');
});

test('parseJSDocURL', t => {
  t.is(
    parseJSDocURL(`/**
  * 外采采购退货单查询 接口描述
  *
  *
  * GET: 请求方法及参数
  */
  `),
    ''
  );

  t.is(
    parseJSDocURL(`/**
  * 外采采购退货单查询 接口描述
  *
  * @url /outsidePicking/getOrderList
  *
  * GET: 请求方法及参数
  */
  `),
    '/outsidePicking/getOrderList'
  );

  t.is(
    parseJSDocURL(`/**
  * 外采采购退货单查询 接口描述
  *
  * @url foo
  *
  * GET: 请求方法及参数
  */
  `),
    'foo'
  );

  t.is(
    parseJSDocURL(`/**
  * 外采采购退货单查询 接口描述
  *
  * @url /outsidePicking /getOrderList
  *
  * GET: 请求方法及参数
  */
  `),
    '/outsidePicking'
  );

  t.is(
    parseJSDocURL(`/**
  * 外采采购退货单查询 接口描述
  *
  * @url /foo-bar/qux
  *
  * GET: 请求方法及参数
  */
  `),
    '/foo-bar/qux'
  );
});
