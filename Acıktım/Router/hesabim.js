const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const ConnectionDB = require('../DB/ConnectionDB');
const path = require("path");
const Users = require("../DB/Users");
const History = require('../DB/History');
router.use(express.static(path.join("")));


let kullaniciID, durum;

let sayfaBas = "", sayfaSon = "", icerik = "";

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


function sayfaYazdir() { fs.writeFile('./user-files/Geçmiş/gecmis.ejs', "" + icerik, () => { }); }


function icerikYazdir(callback) {
    fs.readFile('./sabit-dosyalar/siparis-gecmis-bas.txt', (err, data) => {
        sayfaBas = data.toLocaleString();
    });

    fs.readFile('./sabit-dosyalar/siparis-gecmis-taban.txt', (err, data) => {
        sayfaSon = data.toLocaleString();
    });

    History.find({ ID: kullaniciID }, (error, result) => {
        if (result == "") icerik = "Henüz hiç sipariş vermediniz";
        else icerik = result;
    });
    setTimeout(() => {
        icerik = sayfaBas + icerik + sayfaSon;
        setTimeout(() => {
            callback();
        }, 1100)
    }, 500);
}



router.get('/', (request, response) => {

    function oku() {
        fs.readFile('./hesabim-files/hesabim.ejs', (error, data) => {
            if (durum) response.end(data);
            else response.end("Servis Alınamadı");
        });
    }
    veriAl(kontrolEt, () => {
        setTimeout(function () {
            oku();
        }, 500);
    });

});



router.get('/gecmis', (request, response) => {
    function oku() {
        fs.readFile('./user-files/Geçmiş/gecmis.ejs', (error, data) => {
            if (durum) response.end(data);
            else response.end("Servis Alınamadı");
        });
    }

    veriAl(kontrolEt, () => {
        setTimeout(function () {
            icerikYazdir(sayfaYazdir);
            setTimeout(() => {
                oku();
            }), 100
        }, 500);
    });
});



router.get('/sil', (request, response) => {
    function oku() {
        fs.readFile('./user-files/Hesap Kaldır/hesapKaldir.ejs', (error, data) => {
            if (durum) response.end(data);
            else response.end("Servis Alınamadı");
        });
    }
    veriAl(kontrolEt, () => {
        setTimeout(function () {
            oku();
        }, 500);
    });
});

router.post('/sil', (request, response) => {
    Users.findOne({ ID: kullaniciID }, (err, result) => {
        if (result.password == request.body.sifre && result.username == request.body.kullaniciAdi && request.body.onayliyorum == "ONAYLIYORUM") {
            Users.findOneAndRemove({ ID: kullaniciID }, (error, data) => {
                if (error) console.log("Bir şeyler ters gitti");
                else {
                    fs.writeFile("data.txt", "0", (err, result) => { });
                    console.log("Bir Hesap Silindi");
                }
            });
            fs.readFile('./hesap-sil-yonlendirme/hesapSil.ejs', (error, data) => {
                response.end(data);
            });
        }
        else {
            fs.readFile('./user-files/hata/kaldir/hesapKaldir.ejs', (error, data) => {
                response.end(data);
            });
        }
    });
});




router.get('/kullanici', (request, response) => {
    function oku() {
        fs.readFile('./user-files/Kullanıcı Adı/kullanici.ejs', (error, data) => {
            if (durum) response.end(data);
            else response.end("Servis Alınamadı");
        });
    }
    veriAl(kontrolEt, () => {
        setTimeout(function () {
            oku();
        }, 500);
    });
});

router.post('/kullanici', (request, response) => {
    fs.readFile('./user-files/Kullanıcı Adı/kullanici.ejs', (error, data) => {
        Users.findOne({ ID: kullaniciID }, (err, result) => {
            if (result.password == request.body.password) {
                Users.findOneAndUpdate({ ID: kullaniciID }, { username: request.body.yeniAd }, (err, result) => {
                    if (err) console.log("Hata");
                    else console.log("Başarılı");
                    response.end(data);
                });
            }
            else {
                fs.readFile('./user-files/hata/kullanici/kullanici.ejs', (hata, veri) => {
                    response.end(veri);
                });
            }
        });
    });
});




router.get('/parola', (request, response) => {
    function oku() {
        fs.readFile('./user-files/Parola/parola.ejs', (error, data) => {
            if (durum) response.end(data);
            else response.end("Servis Alınamadı");
        });
    }
    veriAl(kontrolEt, () => {
        setTimeout(function () {
            oku();
        }, 500);
    });
});

router.post('/parola', (request, response) => {
    fs.readFile('./user-files/Parola/parola.ejs', (error, data) => {
        Users.findOne({ ID: kullaniciID }, (err, result) => {
            if (result.password == request.body.eskiParola) {
                if (request.body.yeniParola == request.body.yeniParolaOnay) {
                    Users.findOneAndUpdate({ ID: kullaniciID }, { password: request.body.yeniParola }, (err, result) => {
                        if (err) console.log("Hata");
                        else console.log("Başarılı");
                        response.end(data);
                    });
                }
            }
            else {
                fs.readFile('./user-files/hata/parola/parola.ejs', (hata, veri) => {
                    response.end(veri);
                });
            }
        });
    });
});



module.exports = router;