const Comment = require('../lib/mongo').CommentModel;

module.exports = {
    // 创建一条留言
    create: function create(comment, callback) {
        return Comment.create(comment, callback);
    },
    getComment: function getComment(id, callback) {
        return Comment.find(id, callback);
    },
    // 获取文章下所有留言
    getComments: function getComments(postId, callback) {
        return Comment.find({ postId: postId }, callback)
            .populate({ path: 'author', select: '-_id -password ' })
            .sort({ _id: 1 })
            .exec();
    }
}