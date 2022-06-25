//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const womenHealth = require("./dataSources/womenHealth");
const pregnancySource = require("./dataSources/pregnancy");
const {getHealthContent} = require("./functions/functions")
const functions = require("./functions/functions");
PORT = process.env.PORTAPI || 3000;


//express app
const app = express();

// database and listening
app.listen(PORT, ()=>{
    console.log("Lsitening to request at port 3000");
});



// FUNCTIONS
//this function goes out and fetches health stuff
getHealthContent()
.then(val=>{
    console.log("Health Content Fetched. Success!")
})





// ROUTING STARTS
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


//this end-point returns latest info about women's health
app.get("/health", (req, res)=>{
  
    res.json(functions.healthArray);
    
 
})

//this end-point pregnany related content
//this end-point returns latest info about women's health
app.get("/pregnancy", (req, res)=>{
  
    res.json(pregArry);
    
 
})
    