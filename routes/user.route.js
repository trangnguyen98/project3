var express = require('express');
var router = express.Router();
var middleware = require('../middlewares/dangky.middleware');
var controller = require('../controller/user.controller');

//trang dang ky
router.get('/dangky', controller.trangdangky);
router.post('/dangky', middleware.checkdk, controller.dangky);

//trang dang nhap
router.get('/dangnhap', controller.trangdangnhap);
router.post('/dangnhap', controller.dangnhap);

//dangxuat
router.get('/logout', controller.dangxuat);

//hien thi va them moi user
router.get('/khachang', controller.hienthikhachang);

module.exports = router;