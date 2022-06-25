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

// health sources
const heatlhSources = [
{
    source: "nbcNews",
    url: "https://www.nbcnews.com/health/womens-health",
    base: "https://www.nbcnews.com"
},
{
    source: "theguardian",
    url: "https://www.theguardian.com/lifeandstyle/women",

}

];

//pregnencies issues
let pregSources = [];

//array for storing  health content and then rendering upon request
let healthArray = [];

//array to store content form a certain source
let singleSourceArray = [];



//code to get health related content
//health related content save in health Array
const getHealthContent = async ()=>{
    heatlhSources.forEach(source=>{
    
        axios.get(source.url)
        .then(dataReturned=>{
            const body = dataReturned.data;
            const $ = cheerio.load(body);
            $("a:contains('women')").each(function (){
                const title = $(this).text();
    
                const url = $(this).attr('href');
               
                healthArray.push({
                    title,
                    url,
                    source: source.source
    
                })
    
    
            })
           
            
        })
    
    //forEach ends here    
      })
    
}


//this function goes out and fetches health stuff
getHealthContent()
.then(val=>{
    console.log("Health Content Fetched. Success!")
})


//code to pull health related stuff ends here



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
  
    res.json(healthArray);
    
 
})
    // heatlhSources.forEach(val=>{
    //     let health_source = val.source;
    //     axios.get(val.url)
    //     .then(dataReturned=>{
    //         const body = dataReturned.data;
    //         const $ = cheerio.load(body);
    //         $("a:contains('women')").each(function (){
    //             const title = $(this).text();

    //             const url = $(this).attr('href');
                
    //             healthArray.push({
    //                 title,
    //                 url, 
    //                 health_source
    //             })
    //         })
    //         // console.log(healthArray)
            
    //         res.json(healthArray.reverse());
            
    //     })
        
    // })

    


//


//invalid endpoint
// app.use((req, res)=>{
//     res.status(404).json({msg: "Invalid endpoint. Please cosult the documentation page"})
// )}