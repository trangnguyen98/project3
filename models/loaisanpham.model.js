var express = require('express');
var mongoose = require('mongoose');

var loaisanphamSchema = new mongoose.Schema({
    Name: String
})

var loaisanphamDb = mongoose.model('loaisanphamDb', loaisanphamSchema, 'loaisanpham');

module.exports = loaisanphamDb