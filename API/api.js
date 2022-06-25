//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
PORT = process.env.PORTAPI || 3000;


//express app
const app = express();

// database and listening
app.listen(PORT, ()=>{
    console.log("Lsitening to request at port 3000");
});

// SCRAPING START HERE










// ROUTES START HERE

//docs page

app.get("/", (req, res)=>{

    res.json({msg: "Welcome to the famnet documentation page for its API"})
})

//api route page
app.get("/api", (req, res)=>{

    res.json({msg: "Welcome to the famnet API"})
})



//get all content about family planning and counselling
app.get("/api/all", (req, res)=>{
    res.json({msg: "Here is all the content for family planning and counseling"});
})

//get content from a source when the user enters the name of a source
app.get("/api/:source", (req, res)=>{
    
    res.json({msg: `Here is the content from ${req.params.source}`})
})


//invalid endpoint
app.use((req, res)=>{
    res.status(404).json({msg: "Invalid endpoint. Please cosult the documentation page"});
})