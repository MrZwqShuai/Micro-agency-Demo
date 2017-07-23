const express = require('express');
const router = express.Router();
const path = require('path');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' }) ;
router.post('/', upload.single('file'),(req, res, next) => {
	console.log('上传图片中..',req.file.filename,req.body) ;
	let data = {
		filename:req.file.filename,
		article:req.body
	} ;
	res.json(data) ;
});
module.exports = router;