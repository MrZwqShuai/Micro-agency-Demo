const querystring = require('querystring');
const express = require('express');
const router = express.Router();
const ArticleModel = require('../models/article');
const CommentModel = require('../models/comments');
let checkLogin = require('../middlewares/checkUser').checkLogin;
let getArticles = require('../middlewares/getArticles').getArticles;
router.get('/', getArticles, (req, res, next) => {
    // 获取某个用户或者全部用户的内容

});
// 删除某一篇文章
router.delete('/:options', (req, res, next) => {
    console.log('进入删除文章', req.session.user._id);
    let options = querystring.parse(req.params.options);
    let articleUid = options.uid,
        uid = req.session.user._id,
        articleId = options.aid;
    console.log(options);
    if (uid === articleUid) {
        console.log('有权限删除该内容');
        ArticleModel.removeOneArticle({ _id: articleId }, (error) => {
            console.log('内容已删除');
            res.json({
                code: 200,
                msg: 'success',
                data: {
                    index: 6,
                    message: '内容删除成功'
                } //angular service中
            });
        });
    } else {
        res.json({
            code: 500,
            msg: 'session认证失败',
            data: {
                index: 5,
                message: '不能删除其他人的内容'
            }
        });
    }
});
router.get('/:id', (req, res, next) => {
    console.log(`进入详情页了${req.params.id}`);
    let postId = req.params.id;
    console.log(postId);
    // ArticleModel.getOneArticle({ _id: postId });
    Promise.all([
            ArticleModel.getOneArticle(postId),
            CommentModel.getComments(postId)
        ])
        .then((results) => {
            let currentArticle = results[0], //当前文章的信息
                commentsArr = results[1], //留言信息包括留言者
                author = currentArticle.author, //当前内容的发布者
                content = currentArticle.content; //当前内容
            console.log('异步获取留言与文章详情', results[0], '-----------', author, results[1]);
            res.json({ author: author, content: content, currentArticle: currentArticle, comments: commentsArr });
        })
        .catch(next);
});

module.exports = router;