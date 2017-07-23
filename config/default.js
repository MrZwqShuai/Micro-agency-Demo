module.exports = {
    port: 3000,
    session: {
        secret: 'myCommunity',
        key: 'myCommunity',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/shequ'
};