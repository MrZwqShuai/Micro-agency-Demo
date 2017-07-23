const checkLogin = require('../middlewares/checkUser').checkLogin;
const CommentModel = require('../models/comments');
const ArticleModel = require('../models/article');
module.exports = {
    checkLogin: function(req, res, next) { //检查权限是否登录状态
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.json({ state: req.flash('error').toString(), sessionID: req.sessionID });
        }
        next();
    },
    checkNoLogin: function(req, res, next) {
            if (req.session.user) {
                req.flash('error', '已登录');
                return res.json({ state: req.flash('error').toString(), sessionID: req.sessionID });
            }
            next();
        }
        // else if (req.session.user) {
        //     req.flash('error', '已登录');
        //     CommentModel.getComment(req.sessionID, (err, result) => {
        //         if (!err) {
        //             console.log('已登录的账号');
        //         }
        //         return res.json({ state: req.flash('error').toString(), comments: result });
        //     }); //留言返回的数据
        // }
};