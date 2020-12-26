var userDb = require('../models/user.model')

module.exports.checkdn = async (req, res, next) =>{
    if (!req.signedCookies.username){ //kiem tra xem cos cookie gui len hay k => k co cookie
    res.redirect('/user/dangnhap')
    }else{ // co cookie gui len
        var user = await userDb.findById(req.signedCookies.username)
        if(!user){ // k ton tai user thi no tra ve trang login
            res.redirect('/user/dangnhap')
        }else{
            res.locals.user = user
            console.log(user);
            next(); // ton tai user hop le => thuc hien tiep cac ham dang sau
        }
    }
}