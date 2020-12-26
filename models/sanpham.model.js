var express = require('express');
var mongoose = require('mongoose');

//tao bang du lieu
var themsanphamSchema = new mongoose.Schema({
    Name : String,
    Img : String,
    Title : String, 
    Category : String,
    Nation : String,
    Price : Number,
    Quantity : Number
})

// tao collection
var themsanphamDb = mongoose.model('themsanphamDb', themsanphamSchema, 'sanpham');

module.exports = themsanphamDb; 