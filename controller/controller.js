var mongoose = require('mongoose');
var sanphamDb =require('../models/sanpham.model');
var loaisanphamDb = require('../models/loaisanpham.model');
var multer = require('multer')

//sanpham
module.exports.hienthisanpham = async (req, res) =>{   //bat dong bo
    var data = await sanphamDb.find();
    var sp = JSON.parse(JSON.stringify(data));
    return res.render('products/sanpham', {themsanpham : sp })
}

// module.exports.themsanpham = (req, res) =>{
//     themsanphamDb.create(req.body).then(() => res.redirect('/product/sanpham'))   
// }
module.exports.themsanpham = async (req, res) =>{
    var data = await loaisanphamDb.find();
    var db = JSON.parse(JSON.stringify(data));
    return res.render('products/themsanpham', {themloaisanpham : db})
}

// post ảnh

// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      // Định nghĩa nơi file upload sẽ được lưu lại
      callback(null, "public");
    },
    filename: (req, file, callback) => {
      // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
      // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
      let math = ["image/png", "image/jpeg"];
      if (math.indexOf(file.mimetype) === -1) {
        let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
        return callback(errorMess, null);
      }
      // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
      let filename = `${file.originalname}`;
      callback(null, filename);
    }
  });
  // Khởi tạo middleware uploadFile với cấu hình như ở trên,
  // Bên trong hàm .single() truyền vào name của thẻ input, ở đây là "file"
  let uploadFile = multer({storage: diskStorage}).single("Img");


module.exports.postthemsanpham = (req, res) =>{
    uploadFile(req, res, (err) =>{
        if(err){
          return res.send(`err : ${err}`)
        }
        req.body.Img = req.file.filename
        sanphamDb.create(req.body)
        return res.redirect('/products/sanpham')
      })
}

//loai san pham
module.exports.themloaisanpham = (req, res) =>{
    return res.render('categories/themloaisanpham')
}

module.exports.hienthiloaisanpham = async (req, res) =>{
    var data = await loaisanphamDb.find();
    var loaisp = JSON.parse(JSON.stringify(data)); //json 
    return res.render('categories/loaisanpham', {themloaisanpham : loaisp})
}

module.exports.xoaloaisanpham = async (req, res) =>{
  var id = req.params.id
  await loaisanphamDb.findByIdAndDelete(id)
  return res.redirect('/categories/loaisanpham')
};

module.exports.postthemloaisanpham = async (req, res) =>{
    await loaisanphamDb.create(req.body)
    return res.redirect('/categories/loaisanpham')
}

//sua sp
module.exports.suasp = async (req, res) =>{
    var id = req.params.id;
    var lsp = await loaisanphamDb.find();
    sanphamDb.findById(id).then((x) =>{
        res.render('products/suasp', {value : x, themloaisanpham : lsp})
    })
}

module.exports.capnhatsp = (req, res) =>{
    uploadFile(req, res, (err) =>{
        if(err){
          return res.send(`err : ${err}`)
        }
        req.body.Img = req.file.filename
        var id = req.params.id;
        sanphamDb.findByIdAndUpdate(id, req.body).then(() =>res.redirect('/products/sanpham'))
      })
}

//xoa sp
module.exports.xoasp = (req, res) =>{
    var id = req.params.id;
    sanphamDb.findByIdAndDelete(id).then(() =>res.redirect('/products/sanpham'))
}

module.exports.dangxuat = (req, res) => {
    res.clearCookie('username');
    return res.redirect('/user/dangnhap')
};
