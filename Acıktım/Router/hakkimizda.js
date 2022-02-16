const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
router.use(express.static(path.join("")));

router.get("/", (request, response) => {
    fs.readFile("./hakkimizda-files/hakkimizda.ejs", (error, data) => {
        console.log("Hakkımızda page loaded");
        response.end(data);
    });
});

module.exports = router;