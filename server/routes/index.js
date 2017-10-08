const router = require('koa-router')()

const index = async(ctx, next) => {
    console.log(ctx.status);
    await ctx.render('index', {
        title: 'react16-koa2'
    })
};

router.get('/', index);
router.get('*', index);

module.exports = router;
