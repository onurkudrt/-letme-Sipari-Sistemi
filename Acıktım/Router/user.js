const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const ConnectionDB = require('../DB/ConnectionDB');
const path = require("path");
const History = require("../DB/History");
const Users = require('../DB/Users');
router.use(express.static(path.join("")));


let sepetIcerik, Tutar;

let kullaniciID, durum = 0;

function veriAl(callback1, callback2) {
    fs.readFile("./data.txt", (err, data) => {
        kullaniciID = data.toString();
        callback1();
        callback2();
    });
}

function kontrolEt() {
    Users.findOne({ ID: kullaniciID }, (error, result) => {
        if (result == null) durum = 0;
        else durum = 1;
    });
}


router.get("/", (request, response) => {
    function oku() {
        fs.readFile("./anamenu-login-files/anamenu.ejs", (error, data) => {
            console.log("User anamenu page loaded");
            if (durum) response.end(data);
            else response.end("Servis bulunamadı.");
        });
    }
    veriAl(kontrolEt, () => { setTimeout(function () { oku(); }, 500); });
});



router.get("/menu", (request, response) => {
    function oku() {
        fs.readFile("./menu-login-files/menu.ejs", (error, data) => {
            if (error) throw error;
            console.log("User menu page loaded");
            if (durum) response.end(data);
            else response.end("Servis bulunamadı.");
        });
    }
    veriAl(kontrolEt, () => {
        setTimeout(function () {
            oku();
        }, 500);
    });
});


router.get("/hakkimizda", (request, response) => {

    function oku() {
        fs.readFile("./hakkimizda-login-files/hakkimizda.ejs", (error, data) => {
            if (error) throw error;
            console.log("User hakkimizda page loaded");
            if (durum) response.end(data);
            else response.end("Servis bulunamadı.");
        });
    }
    veriAl(kontrolEt, () => {
        setTimeout(function () {
            oku();
        }, 500);
    });
});

router.post("/odeme", (request, response) => {
    fs.readFile("./odeme-login-files/odeme.ejs", (err, data) => {
        if (err) throw err;
        sepetIcerik = request.body.informationSepet;
        Tutar = request.body.informationFee;
        console.log("User odeme page loaded");
        response.end(data);
    });
});


router.post('/odeme/islem', (request, response, next) => {
    if (Tutar == 0) {
        fs.readFile("./bos-sepet-login/hata.html", (err, data) => {
            if (err) throw err;
            console.log("Başarısız");
            response.end(data);
        });
    }
    else {
        Tutar = Tutar * 95 / 100;
        const newHistory = new History({
            Name: request.body.adTxt,
            LastName: request.body.soyadTxt,
            telpNo: request.body.telNoTxt,
            mail: request.body.txtPosta,
            adress: request.body.adresTxt,
            card: {
                FullNameCardOwner: request.body.kAdSoyadtxt,
                CardNumber: request.body.karNoTxt,
                expirationDate: request.body.kartSonKulTrhTxt,
                CVV: request.body.cvvTxt
            },
            Basket: {
                Contens: sepetIcerik,
                Fee: Tutar
            },
            ID: kullaniciID
        });
        newHistory.save();
        fs.readFile("./login-geri-don-files/geriDon.html", (err, data) => {
            if (err) throw err;
            console.log("Payment has been made successfully");
            response.end(data);
        });
    }
});


module.exports = router;