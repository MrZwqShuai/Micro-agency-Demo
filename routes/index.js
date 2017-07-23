module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    app.use('/articles', require('./articles'));
    app.use('/file',require('./file')) ;
    //404page
    app.use((req, res) => {
        if (!res.headerSent) {
            res.status(404).render('404');
        }
    });
}