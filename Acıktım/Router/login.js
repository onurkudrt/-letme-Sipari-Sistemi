const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const users = require('../DB/Users'); 
router.use(express.static(path.join("")));

let Uname, Upassword;
let veri;

router.get("/", (request, response) => {
    fs.readFile("./login-files/login.ejs", (err, data) => {
        if (err) throw err;
        console.log("Login page loaded");
        response.end(data);
    });
})



router.post('/', (request, response) => {
    Uname = request.body.name;
    Upassword = request.body.password;
    const search = (callback) => {
        users.findOne({ username: Uname, password: Upassword }, (error, result) => {
            veri = result;
            if (result === null) {
                fs.readFile("./login-error-files/login.ejs", (err, data) => {
                    if (err) throw err;
                    console.log("Login error\nUsername: " + Uname + " Password: " + Upassword + "\nNot found");
                    response.end(data);
                });
            }
            else
                callback();
        });
    }

    const successful = () => fs.readFile("./anamenu-login-files/anamenu.ejs", (err, data) => {
        if (err) throw err;
        console.log("Username: " + Uname + " logged in");

        response.end(data);
        users.findOne({ username: Uname, password: Upassword }, (error, result) => {
            fs.writeFile("./data.txt", "" + result.ID, err => { });
            console.log(result.ID);
        })
    });
    search(successful);
});

module.exports = router;