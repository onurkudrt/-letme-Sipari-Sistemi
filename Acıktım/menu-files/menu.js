var urunSepeti = [];
var urunMiktari = [];
let fee = 0;
const classPrince = document.getElementsByClassName('Fiyat');
var prince = [];
var icerik = "";
function sepeteEkle(deger, callback) {

    var urunAdi = document.getElementsByClassName("baslik")[deger].textContent;
    var urunAdedi = document.getElementsByClassName("miktar")[deger].value;

    if (urunAdedi < 0) alert("Lütfen gerçekçi değerler giriniz. Sipariş miktarı negatif olamaz!");

    else {
        icerik = ""; fee = 0;
        if (urunSepeti.includes(urunAdi, deger)) {
            urunMiktari[deger] = urunAdedi;
            for (var i = 0; i < urunSepeti.length; i++) {
                if (urunSepeti[i] == undefined || urunSepeti[i] == "") continue;
                icerik += urunSepeti[i] + " - " + urunMiktari[i] + " TANE<br/>";
                fee += prince[i] * urunMiktari[i];
            }
        }

        else {
            fee = 0;
            urunSepeti[deger] = urunAdi;
            urunMiktari[deger] = urunAdedi;
            for (var i = 0; i < urunSepeti.length; i++) {
                if (urunSepeti[i] == undefined || urunSepeti[i] == "") continue;
                icerik += urunSepeti[i] + "  - " + urunMiktari[i] + " TANE<br/>";
                fee += prince[i] * urunMiktari[i];
            }
        }
    }
    callback();
}

const yazdir = () => {
    fee.toFixed(2);
    document.getElementById("SEPET").innerHTML = "<br/>" + icerik;
    document.getElementById("fee").innerHTML = "Sepet Değeri: " + fee + "₺";
    document.getElementById("informationSepet").value = icerik;
    document.getElementById("informationFee").value = fee;
    console.log(fee);
}

const removeFromBasket = (value, callback) => {
    if (urunSepeti[value] == undefined && urunSepeti[value] == "") alert("Sepette zaten böyle bir ürün yok.");
    else {
        function calisacak() {
            icerik = ""; fee = 0;
            urunSepeti[value] = "";
            urunMiktari[value] = 0;
            for (var i = 0; i < urunSepeti.length; i++) {
                if (urunSepeti[i] == undefined) continue;
                if (urunSepeti[i] == "") continue;
                icerik += urunSepeti[i] + " - " + urunMiktari[i] + " TANE<br/>";
                fee += prince[i] * urunMiktari[i];
            }
            callback();
        }
        calisacak();
    }

}

const cikar = () => {
    fee.toFixed(2);
    document.getElementById("SEPET").innerHTML = "<br/>" + icerik;
    document.getElementById("fee").innerHTML = "Sepet Değeri: " + fee + "₺";
    document.getElementById("informationSepet").value = icerik;
    document.getElementById("informationFee").value = fee;
    console.log(fee);
}

const assignment = (callback) => {
    for (var i = 0; i < classPrince.length; i++)  prince[i] = classPrince[i].innerHTML;
    callback();
}

const write = () => {
    for (var i = 0; i < classPrince.length; i++)
        classPrince[i].innerHTML += "₺";
    convert();
}

const convert = () => { for (var i = 0; i < classPrince.length; i++) prince[i] *= 1; }


const totalPrince = () => {
    console.log(document.getElementById("Tutar").innerHTML)
    //document.getElementById("Tutar").innerHTML="Ödeme Tutarı:"+fee+"₺";
}


assignment(write);

/*
const product= [];
function gonder() {
for(let i=0;i<urunSepeti.length;i++)
{
product[i] = {
    urunAdi:urunSepeti[i],
    urunMiktari:urunMiktari[i]
    };
}
}

//module.exports = {fee,urunSepeti,urunMiktari};


/*
const path = require('path');
yemekSiparis = path.parse(__dirname);

const a = require(yemekSiparis.dir+"/server.js");

function odemeButton() {
    a.odeme();
}

/*
const path = require('path');
//console.log(path.parse(__dirname));
yemekSiparis = path.parse(__dirname);
console.log(yemekSiparis.dir);

const odeme = require(yemekSiparis.dir+"/server.js");

odeme();

*/



//icerik=icerik+'<br/>'+urunAdi+" "+urunAdedi+" TANE";
//document.getElementById("SEPET").innerHTML=icerik;