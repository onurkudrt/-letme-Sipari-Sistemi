const mongoose = require('mongoose');

const Connect = mongoose.connect('mongodb+srv://admin:admin@onur.btcmg.mongodb.net/ACIKTIM?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connection succesful");
    })
    .catch((err) => {
        console.log("Occured an error");
    });

module.exports = Connect;

