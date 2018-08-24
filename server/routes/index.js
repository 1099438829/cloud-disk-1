const router = require('koa-router')();

const index = async(ctx, next) => {
    await ctx.render('index', {
        title: 'cloud-disk'
    })
};

router.get('/', index);
router.get('*', index);

module.exports = router;
