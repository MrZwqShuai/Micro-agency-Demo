const express = require('express');
const router = express.Router();
const Article = require('../lib/mongo').ArticleModel;


let i = 0;
module.exports = {
    //创建一篇文章
    create: function create(article, callback) {
        return Article.create(article, callback);
    },
    // 获取所有内容或者某个用户所有内容
    getArticle: function getArticle(author, callback) {
        let query = {};
        i++;
        if (author) {
            query.author = author;
        }
        return Article
            .find(query, callback)
            .populate({ path: 'author' })
            .limit(5 * i)
            .sort({ _id: -1 });
    },
    // 添加留言
    upDateArticle: function upDateArticle(conditions, newData, callback) {
        return Article.update(conditions, newData, callback);
    },
    // 内容总数
    getArticleTotals: function getArticleTotals(author, callback) {
        return Article.count({}, callback);
    },
    // 获取单篇内容
    getOneArticle: function getOneArticle(postId, callback) {
        return Article.findOne({ _id: postId }, callback)
            .populate({ path: 'author' })
            .exec();
    },
    // 删除单篇内容
    removeOneArticle: function removeOneArticle(conditions, callback) {
        return Article.remove(conditions, callback);
    }
};