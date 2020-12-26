var mongoose = require('mongoose');

 var userSchema = new mongoose.Schema({
     username : String,
     password : String,
     email : String,
     phonenumber : Number,
 });

 //tao collection
var userDb = mongoose.model('userDb', userSchema, 'user');

 module.exports = userDb;