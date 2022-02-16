const mongoose = require('mongoose');
const Connect = require('./ConnectionDB');
Connect;

const MenuSchema = new mongoose.Schema({
    ID: Number,
    Name: String,
    İçerik: String,
    Fiyat: Number,
    Resim: String
});

module.exports = mongoose.model('menu', MenuSchema);