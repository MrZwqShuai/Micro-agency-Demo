const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.jpg');
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
    // UserModel.find({ 'username': '222' }).select('username').exec((err, results) => {
    //     if (!err) {
    //         console.log(results);
    //     }
    // });
    // console.log('www');
});
router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log('session!!!!------', req.session, req.file, req.body);
    let username = req.body.username,
        password = req.body.password,
        nickname = req.body.nickname,
        avatar = req.file ? (req.file.destination + req.file.path.split(path.sep).pop()) : '',
        user = {
            username: username,
            password: password,
            gender: '男',
            bio: '',
            avatar:avatar,
            nickname:nickname
        };
    UserModel.getUserName(username)
        .then((result) => {
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