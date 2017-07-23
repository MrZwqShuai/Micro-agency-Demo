const express = require('express');
const router = express.Router();
const UserModel = require('../lib/mongo').UserModel;
const User = require('../models/users');
const Article = require('../lib/mongo').ArticleModel;
let getArticles = require('../middlewares/getArticles').getArticles;
// 设置个人资料获取登录用户的信息
router.get('/', function(req, res, next) {
    console.log(`用户名是${req.session.user.username}`);
    let username = req.session.user.username;
    User.getUserName(username).then((userInfo) => {
        console.log(userInfo);
        res.json({ userInfo: userInfo });
    });
});
router.get('/:uid', getArticles, function(req, res, next) {
    console.log('....进入个人用户', req.params.uid);
});
router.put('/:uid/edit', function(req, res, next) {
    let username = req.session.user.username;
    console.log('put进来了', req.body);
    let bios = req.body.bios;
    let gender = req.body.gender;
    User.getUserInfo(username, (err, results) => {
        console.log('用户信息是', results.bio);
        let bio = results.bio; //这里的bio是查询之后的bio
        if (bios) {
            UserModel.update({ username: username }, { '$set': { bio: bios } }, { multi: true }, (err, results) => {
                console.log('更新成功');
            });
        } else if (gender) {
            UserModel.update({ username: username }, { '$set': { gender: gender } }, { multi: true }, (err, results) => {
                console.log('更新成功');
            });
        }
    });
    // User.getUserName(username).then((userInfo) => {
    //     console.log(userInfo);
    // });
});
router.get('/:uid/edit', function(req, res, next) {
    console.log('哈哈哈');
    let username = req.session.user.username;
    User.getUserInfo(username).then((userInfo) => {
        console.log(userInfo);
        res.json({ userInfo: userInfo });
    });
});
module.exports = router;