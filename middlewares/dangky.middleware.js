var userDb = require('../models/user.model');
//check trong db
//trung thi bao loi
//k thi luu vao db

module.exports.checkdk = async (req, res, next) =>{
    var user = await userDb.findOne({username : req.body.username})
    if(user){
        res.render('user/dangky', {thongbao : 'tên người dùng đã tồn tại'});
    }else{
        next();
    }
}