const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Connect = require('./ConnectionDB');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    ID: String
});

module.exports = mongoose.model('user', userSchema)