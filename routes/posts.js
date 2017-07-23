const express = require('express');
const router = express.Router();
const path = require('path');
//修改保存本地文件的后缀名
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'app/uploads/');
    },
    filename: function(req, file, cb) {
       cb(null, file.originalname + '-' + Date.now()+'.jpg');
    }
});
let upload = multer({ storage: storage });
const CommentModel = require('../models/comments');
const ArticleModel = require('../models/article');
const Article = require('../lib/mongo').ArticleModel;
const checkLogin = require('../middlewares/checkUser').checkLogin;
//创建一篇文章
router.post('/create', upload.single('file'), (req, res, next) => {
    console.log('-------', req.file);
    // console.log('文章发表中----', req.file.destination, req.file.path.split(path.sep).pop(), req.body);
    let content = req.body.pushTxt,
        author = req.session.user._id,
        publishDate = new Date().toLocaleString(),
        photoSrc = req.file ? (req.file.destination + req.file.path.split(path.sep).pop()) : '',
        photoSize = req.file ? req.file.size : 0;
    console.log(photoSrc, photoSize);
    photoSrc = photoSrc.replace('app', '');
    let article = {
        author: author,
        content: content,
        publishDate: publishDate,
        photoSrc: photoSrc,
        photoSize: photoSize
    };
    console.log(222, '文章发表中...', article);
    ArticleModel.create(article, (err, result) => {
        if (err) console.log('错误信息',err);
        console.log('文章发表成功', result);
        res.json(result);
    });
});

router.post('/comment', checkLogin, (req, res, next) => {
    console.log(111, '留言提交进来了111', req.body.postId);
    let author = req.session.user._id;
    let content = req.body.content,
        cDate = req.body.cDate.toLocaleString(),
        postId = req.body.postId;
    let comment = {
        author: author,
        content: content,
        postId: postId,
        cDate: cDate
    };
    console.log(author, comment);
    // 查找当前评论的单篇动态
    console.log('评论当前文章数据');
    CommentModel.create(comment, (err, results) => {
        if (!err) {
            console.log('保存留言成功', results);
            // A.comments.push(results);
            // A.save((aaa, bbb) => {
            //     console.log('保存了?', bbb);
            // });
        } else {
            console.error(err);
        }
    });
});
module.exports = router;