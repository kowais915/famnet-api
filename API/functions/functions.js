const womenHealthSources = require("../dataSources/womenHealth");
const axios = require("axios");
const cheerio = require("cheerio");

//DATA STORAGE IN ARRAYS

//array for storung pregnencies related content
let pregArry = [];

//array for storing family planning related content
let familyPlanning = [];

//array for storing  health content and then rendering upon request
let healthArray = [];

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

const getPregContent = ()=>{

}

module.exports = {
    getHealthContent,
    getPregContent,
    healthArray

}