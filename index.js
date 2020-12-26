var express = require('express');
var exphbs = require('express-handlebars');
var multer = require('multer');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopdienthoai', {useNewUrlParser: true, useUnifiedTopology: true});

var checkdangnhap = require('./middlewares/dangnhap.middleware');
var checkdangky = require('./middlewares/dangky.middleware');
var userRouter = require('./routes/user.route');
var sanphamRouter = require('./routes/sanpham.route');



 

var app = express();
var port = 8000;

app.use(express.static('public')); // su dung folder public
// //chưa thêm route san pham

app.use(cookieParser('hello')); //chuoi bat ky
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/categories', checkdangnhap.checkdn, sanphamRouter);
app.use('/products', checkdangnhap.checkdn, sanphamRouter);
app.use('/user', userRouter);

app.set('view engine', 'hbs'); // chay view
app.engine('.hbs',exphbs({defaultLayout : 'layout',extname: '.hbs'})); // chay view
app.get('/', checkdangnhap.checkdn, (req, res) =>{
    res.render('index',{name : 'user.name'})
});

//localhost:8000

app.listen(port, ()=> console.log('server is running...')); // chay server
