/**
 * 多个 middleware 示例，每个都必须定义 path
 */
module.exports = () => ([
  {
    method: 'get',
    path: '/example/multiple/foo',
    async middleware(ctx, next) {
      ctx.body = {
        foo: 'foo',
        list: [1, 2, 3, 4, 5]
      };
    }
  },
  {
    method: 'get',
    path: '/example/multiple/bar',
    async middleware(ctx, next) {
      ctx.body = {
        foo: 'bar',
        list: [1, 2, 3, 4, 5]
      };
    }
  },
  {
    method: 'get',
    path: '/example/multiple/jsonp',
    async middleware(ctx, next) {
      ctx.jsonp = {
        foo: 'bar',
        list: [1, 2, 3, 4, 5]
      };
    }
  }
]);
