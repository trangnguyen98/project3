var mongoose = require('mongoose');
var userDb = require('../models/user.model');

module.exports.trangdangky = (req, res) =>{
    return res.render('user/dangky')
}

module.exports.dangky = async (req, res) =>{
    userDb.create(req.body).then(() => res.redirect('/user/dangnhap'))
}

module.exports.trangdangnhap = (req, res) =>{
    console.log(req.signedCookies.username);
    return res.render('user/dangnhap')
}

module.exports.dangnhap = async (req, res) =>{
    var user = await userDb.findOne({username : req.body.username})
    if(user != null){ // neu co user trong db thi kiem tra password
        if(user.password == req.body.password){
            res.cookie('username', user.id,{
                signed : true //
            })
            return res.redirect('/');
        }
        res.render('user/dangnhap', {thongbao : 'tai khoan hoac mat khau khong dung'});
    }
    res.render('user/dangnhap', {thongbao : 'tai khoan k ton tai'});
}

module.exports.dangxuat = (req, res) =>{
    res.clearCookie('username') //ten cookie la username, xoas cookie
    return res.redirect('/user/dangnhap')
}

module.exports.hienthikhachang = async (req, res) =>{
    var data = await khachhangDb.find();
    var user = JSON.parse(JSON.stringify(data));
    return res.render('users/khachhang')
}