/**
 * 原始 koa router 示例
 */
module.exports = ({ router }) => {
  router
    .get('/example/users', (ctx, next) => {
      ctx.body = 'Hello World!';
    })
    .post('/example/users', (ctx, next) => {
      // ...
    })
    .put('/example/users/:id', (ctx, next) => {
      // ...
    })
    .del('/example/users/:id', (ctx, next) => {
      // ...
    })
    .all('/example/users/:id', (ctx, next) => {
      // ...
    });
};
