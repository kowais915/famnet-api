const womenHealthSources = require("../dataSources/womenHealth");
const pregSources = require("../dataSources/pregnancy");
const axios = require("axios");
const cheerio = require("cheerio");
const familySources  = require("../dataSources/familyPlanningSources");

//DATA STORAGE IN ARRAYS

//array for storung pregnencies related content
let pregArry = [];

//array for storing family planning related content
let familyPlanning = [];

//array for storing  health content and then rendering upon request
let healthArray = [];


//array for storing  birth control ontent and then rendering upon request
let birthArray = [];


//array to store content form a certain source
let singleSourceArray = [];


//function to get health related content
const getHealthContent = async ()=>{
    womenHealthSources.forEach(source=>{
    
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


//function to get pregnancy related content

const getPregContent = async ()=>{

    familySources.forEach(source =>{
        console.log(source);
        axios.get(source.url)
        .then(resp =>{
            const body = resp.data;
            const $ = cheerio.load(body);
            $("a").each(function (){
                const title = $(this).text();

                const url = $(this).attr("href");
                // const url = source.base + url1;
                
                pregArry.push({
                    title,
                    url,
                    source: source.source
                });
                pregArry.reverse();
            })
        } )
    })

}

//family planning content

const getFmilyPlanning = async () =>{

    familySources.forEach(source =>{
        console.log(source);
        axios.get(source.url)
        .then(resp =>{
            const body = resp.data;
            const $ = cheerio.load(body);
            $("a:contains('birth')").each(function (){
                const title = $(this).text();

                const url = $(this).attr("href");
                // const url = source.base + url1;
                
                birthArray.push({
                    title,
                    url,
                    source: source.source
                });
                birthArray.reverse();
            })
        } )
    })
    
}

module.exports = {
    getHealthContent,
    getPregContent,
    healthArray,
    pregArry,
    birthArray,
    getFmilyPlanning

}