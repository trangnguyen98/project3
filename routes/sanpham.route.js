var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

//hien thi va them sp moi
router.get('/sanpham', controller.hienthisanpham);
router.get('/themsanpham', controller.themsanpham);
router.post('/themsanpham', controller.postthemsanpham);
router.post('/sanpham', controller.postthemsanpham);

//hien thi va them category moi
router.get('/loaisanpham', controller.hienthiloaisanpham);
router.get('/themloaisanpham', controller.themloaisanpham);
router.post('/themloaisanpham', controller.postthemloaisanpham);
router.post('/loaisanpham', controller.postthemloaisanpham);
router.get('/loaisanpham/xoa/:id', controller.xoaloaisanpham)
//sua sp
router.get('/sua/:id', controller.suasp);
router.post('/sua/:id', controller.capnhatsp);

//xoa sp
router.get('/xoa/:id', controller.xoasp);

module.exports = router;