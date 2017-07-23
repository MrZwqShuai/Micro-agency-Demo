const UserModel = require('../models/users');
const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checkUser').checkLogin;
let checkNoLogin = require('../middlewares/checkUser').checkNoLogin;
router.get('/', checkNoLogin, (req, res, next) => {});
router.post('/', checkNoLogin, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    UserModel.getUserName(username)
        .then((user) => {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.json({ state: req.flash('error').toString() });
            }
            if (password !== user.password) {
                req.flash('error', '用户名或密码错误');
                return res.json({ state: req.flash('error').toString() });
            }
            req.flash('success', '登录成功');
            req.session.user = user;
            console.log('登录成功', req.sessionID);
            res.json({ state: req.flash('success').toString() });
        });
});

module.exports = router;