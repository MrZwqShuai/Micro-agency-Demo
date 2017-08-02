const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
//用户模型
let UserSchema = new mongoose.Schema({
    username: { type: 'string', required: true, unique: true, min: 8 },
    password: { type: 'string', required: true, min: 8, unique: true },
    gender: { type: 'string' },
    bio: { type: 'string' },
    avatar: { type: 'string' },
    nickname: { type: 'string' }
    // articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArticleModel' }]
});
//留言模型
let CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    content: { type: 'string' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'ArticleModel' },
    cDate: { type: 'string' }
});

//文章说说内容模型
let ArticleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    content: { type: 'string' },
    publishDate: { type: 'string' },
    photoSrc: { type: 'string' },
    photoSize: { type: 'number' }
    // mongodb嵌入式的应用一般用于子记录和主纪录有密切关系，而且子记录数量不大
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' }]
});
//收藏内容模型
let StarSchma = new mongoose.Schema({
    follow: { type: mongoose.Schema.Types.ObjectId }
});

let UserModel = mongoose.model('UserModel', UserSchema);
let CommentModel = mongoose.model('CommentModel', CommentSchema);
let ArticleModel = mongoose.model('ArticleModel', ArticleSchema);
exports.UserModel = UserModel;
exports.CommentModel = CommentModel;
exports.ArticleModel = ArticleModel;
// 5966204448ac5d21842ff891