const express = require('express');
const router = express.Router();
const Menu = require('../DB/Menu');
const fs = require('fs');
const path = require('path');
router.use(express.static(path.join("")));

router.get('/', (request, response) => {
    console.log("Menu loaded");
    fs.readFile("./menu-files/menu.ejs", (err, data) => {
        if (err) throw err;
        console.log("Menu page loaded");

        response.end(data);
    });

});
module.exports = router;