const scrapeIt = require("scrape-it");
const cheerio = require('cheerio');

const craigscraper = ()=>{
    return {
        test:()=>{
            console.log('hiiii')
        },
        getItems:(url)=>{
            return new Promise((resolve,reject)=>{
                
            })
        }
    }
};

module.exports = craigscraper;


/*
scrapeIt(
                    'https://losangeles.craigslist.org/d/furniture/search/fua',
                    {
                        results:{
                            
                            data:{
                                id:{
                                    selector:'.result-info a',
                                    attr:'data-id'
                                },
                                title:{
                                    selector:'.result-info a'
                                },
                                neighborhood:{
                                    selector:'.result-meta .result-hood'
                                },
                                price:{
                                    selector:'.result-meta .result-price'
                                },
                                url:{
                                    selector:'.result-info a',
                                    attr:'href'
                                },
                                imageUrl:{
                                    selector:'.result-price',
                                    attr:'class'

                                    
                                    
                                }
                            }
                        }
                    }).then(page=>{
                    resolve(page);
                })
*/