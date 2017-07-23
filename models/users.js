let User = require('../lib/mongo').UserModel;

module.exports = {
    createUser: function createUser(user, callback) {
        return User.create(user, callback);
    },
    getUserName: function getUserName(username, password) {
        return User
            .findOne({ username: username }, (err, results) => {
                console.log('获取的信息:' + results); //查询用户是否存在
            });
    },
    getUserInfo: function getUserInfo(username, callback) {
        return User.findOne({ username: username }, callback);
    } 
};