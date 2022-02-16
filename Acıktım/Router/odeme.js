const express = require('express');
const router = express.Router();
const fs = require('fs');
const History = require('../DB/History');
const path = require('path');

router.use(express.static(path.join("")));

let kullaniciID;

function veriAl() {
    fs.readFile("./data.txt", (err, data) => {
        kullaniciID = data.toString();
    });
}

let sepetIcerik, Tutar;

router.post('/', (request, response, next) => {
    fs.readFile("./odeme-files/odeme.ejs", (err, data) => {
        if (err) throw err;
        sepetIcerik = request.body.informationSepet;
        Tutar = request.body.informationFee;
        console.log("Odeme page loaded");
        response.end(data);
    });
});

router.post('/islem', (request, response, next) => {
    if (Tutar == 0) {
        fs.readFile("./bos-sepet/hata.html", (err, data) => {
            if (err) throw err;
            console.log("Başarısız");
            response.end(data);
        });
    }
    else {
        veriAl();
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
        fs.readFile("./geri-don-files/geriDon.html", (err, data) => {
            if (err) throw err;
            console.log("Payment has been made successfully");
            response.end(data);
        });

    }
});


/*
router.post('/',(request,response)=>{
    console.log(request.body);
response.end();
})

*/


module.exports = router;






/*
    menu = new Menu({
    Name: object.firstName,
    LastName: object.lastName,
    mail: object.mail,
    adress: object.adressCardOwner,
    card: {
        FullNameCardOwner:object.card.FullName,
        CardNumber: object.card.CardNumber,
        expirationDate:object.card.DateInformation,
        CVV:object.card.NumberCVV
    }
});
menu.save((err,data)=>{
    if(err) console.log(err);
    console.log(data);
   // console.log(Fee);

});
*/