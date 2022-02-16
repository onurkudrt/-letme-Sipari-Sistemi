const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const ConnectionDB = require('../DB/ConnectionDB');
const User = require('../DB/Users');
const path = require("path");
const { callbackify } = require('util');
router.use(express.static(path.join("")));

let kontrol = 0, id;

router.get('/', (request, response) => {
    fs.readFile('./register-files/register.ejs', (error, data) => {
        response.end(data);
    });
});


router.post('/', (request, response) => {
    const kontrolFonksiyonu = (callback) => {

        User.findOne({ username: request.body.registerUsername }, (error, result) => {
            if (result == null) {
                kontrol = 1;
                do {
                    id = Math.floor(Math.random() * 10000000);
                    User.findOne({ ID: id }, (error, result1) => {
                        if (result1 == null) { kontrol = 1; callback(); }
                    });
                } while (kontrol == 0);
            }
            else {
                console.log(result + "\n Zaten var\n");
                fs.readFile("./register-error-files/register.ejs", (error, data) => {
                    response.end(data);
                });
            }
        });
    }

    const kayitFonksiyonu = () => {

        const newUser = new User({
            username: request.body.registerUsername,
            password: request.body.registerPassword,
            ID: id
        });
        newUser.save()
            .then(() => {
                console.log("\nSaved\n" + request.body.registerUsername + " " + request.body.registerPassword + " " + id);

            }).catch((err) => {
                throw err;
            });

        fs.readFile('./anamenu-login-files/anamenu.ejs', (error, data) => {
            fs.writeFile("./data.txt", "" + id, err => { });
            response.end(data);
        });
    }
    kontrolFonksiyonu(kayitFonksiyonu);
});

module.exports = router;