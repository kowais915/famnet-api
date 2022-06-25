//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
PORT = process.env.PORT || 3000;


//express app
const app = express();

// listening
app.listen(PORT, ()=>{
    console.log("Lsitening to request at port 3000");
});


//root route
app.get("/", (req, res)=>{

    res.json({msg: "Welcome to the famnet API"})
})
