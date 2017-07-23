const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('session是', req.session.user);
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/#!/user.html');
});

module.exports = router;