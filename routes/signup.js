const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const path = require('path');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let upload = multer({ storage: storage });
router.get('/', function (req, res, next) {
    console.log('接受zwq', res.fields, 222);
    UserModel.create(req.query, (err, user) => {
        if (!err) {
            console.log('saved!');
        }
    });
});
router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log('session!!!!------', req.session, req.file, req.body);
    let username = req.body.username,
        password = req.body.password,
        nickname = req.body.nickname,
        bio      = req.body.bio;
    avatar = req.file ? (req.file.destination + req.file.path.split(path.sep).pop()) : '';
    avatar = avatar.replace('app', '');
    let user = {
        username: username,
        password: password,
        gender: '男',
        bio: bio,
        avatar: avatar,
        nickname: nickname,
        bio: bio
    };
    console.log(user);
    UserModel.getUserName(username)
        .exec((result) => {
            console.log(user);
            console.log('9-------', result);
            if (!result) {
                console.log('用户名可用 准备载入数据库..');
                UserModel.createUser(user, (err, results) => {
                    if (!err) {
                        req.session.user = results;
                        console.log('saved!', req.session.user);
                        req.flash('success', '注册成功');
                        res.json({ state: req.flash('success').toString() });
                    }
                });
            } else {
                req.flash('error', '用户名已占用');
                console.log('用户名已占用');
                res.json({ state: req.flash('error').toString() });
            }
        });
});
module.exports = router;