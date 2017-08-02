let User = require('../lib/mongo').UserModel;

module.exports = {
    createUser: function createUser(user, callback) {
        return User.create(user, callback);
    },
    getUserName: function getUserName(username, password) {
        return User
            .findOne({ username: username });
    },
    getUserInfo: function getUserInfo(username, callback) {
        return User.findOne({ username: username }, callback);
    }
};