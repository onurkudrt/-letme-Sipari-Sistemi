const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const DataBase = require('./DB/ConnectionDB');
const bodyParser = require('body-parser');
app.use(express.static(path.join("/")));

app.set("view engine", "ejs");
app.set("", path.join(__dirname));

fs.writeFile("./data.txt", "0", (err,) => { if (err) console.log(err) });


const anamenuRouter = require("./Router/anamenu.js");
const menuRouter = require('./Router/menu.js');
const odemeRouter = require('./Router/odeme.js');
const loginRouter = require('./Router/login.js');
const registerRouter = require('./Router/register.js');
const userRouter = require("./Router/user.js");
const hakkimizdaRouter = require("./Router/hakkimizda.js");
const hesabimRouter = require('./Router/hesabim.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', anamenuRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/menu', menuRouter);
app.use('/odeme', odemeRouter);
app.use('/user', userRouter);
app.use('/hakkimizda', hakkimizdaRouter);
app.use('/user/hesabim', hesabimRouter);
app.listen(2005);


module.exports = app; 