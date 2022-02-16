const mongoose = require('mongoose');

const DBhistorySchema = new mongoose.Schema({
    Name: String,
    LastName: String,
    telpNo: String,
    mail: String,
    adress: String,
    card: {
        FullNameCardOwner: String,
        CardNumber: Number,
        expirationDate: Date,
        CVV: Number
    },
    Basket: {
        Contens: String,
        Fee: String
    },
    ID: String
});

module.exports = mongoose.model('history', DBhistorySchema);