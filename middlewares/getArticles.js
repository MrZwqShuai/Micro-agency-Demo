const checkLogin = require('../middlewares/checkUser').checkLogin;
const CommentModel = require('../models/comments');
const ArticleModel = require('../models/article');
module.exports = {
    // 获取所有用户或者某个用户发布的全部内容
    getArticles: function(req, res, next) {
        console.log('首页数据获取..');
        if (!req.session.user) {
            req.flash('error', '未登录');
            console.log('get请求的head', req.session.user, req.params.uid);
            ArticleModel.getArticleTotals(req.params.uid, (err, totals) => {
                console.log('文章总数' + totals);
                //由于basedata操作异步 所以在回调出结果之后再判断
                ArticleModel.getArticle(req.params.uid, ((err, results) => {
                    console.log('用户发表文章返回的数据' + results);
                    //这里为了以后文章篇数过长增加循环改变返回文章的格式用_id代替ng的postId
                    // let articleResults = {
                    //     content: results.content,
                    //     postId: results._id,
                    //     options: '扩展中...'
                    // }
                    if (totals > results.length) {
                        return res.json({ state: req.flash('error').toString(), results: results, isEmptyArticle: false });
                    } else if (totals <= results.length) {
                        return res.json({ state: req.flash('error').toString(), results: results, isEmptyArticle: true });
                    }
                }));
            });
        } else if (req.session.user) {
            req.flash('error', '已登录');
            console.log('get请求的head', req.session.user, req.query.author);
            ArticleModel.getArticleTotals(req.query.author, (err, totals) => {
                console.log('文章总数' + totals);
                //由于basedata操作异步 所以在回调出结果之后再判断
                ArticleModel.getArticle(req.params.uid, ((err, results) => {
                    console.log('用户发表文章返回的数据' + results);
                    //这里为了以后文章篇数过长增加循环改变返回文章的格式用_id代替ng的postId
                    // let articleResults = {
                    //     content: results.content,
                    //     postId: results._id,
                    //     options: '扩展中...'
                    // }
                    if (totals > results.length) {
                        return res.json({ state: req.flash('error').toString(), results: results, isEmptyArticle: false });
                    } else if (totals <= results.length) {
                        return res.json({ state: req.flash('error').toString(), results: results, isEmptyArticle: true });
                    }
                }));
            });
        }
        next();
    },
    // 获取所有发布的全部内容
    getAllArticles: function getUserArticles() {}
};