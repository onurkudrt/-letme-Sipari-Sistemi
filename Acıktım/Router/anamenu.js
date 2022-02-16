const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.use(express.static(path.join("")));

router.get('/', (request, response) => {
    fs.readFile("./anamenu-files/anamenu.ejs", (error, data) => {
        if (error) throw error;
        console.log("Anamenu page loaded");
        response.end(data);
    });
});
module.exports = router;