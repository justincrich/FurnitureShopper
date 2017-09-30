const cheerio = require('react-native-cheerio');

export default class CraigsList {
  constructor(url){
    this.url = url;
  }

  scrape(parameters,totalRes=120,startIndex=undefined){
    return new Promise ((res,rej)=>{
      let reqIndex;
        if(typeof startIndex === 'undefined'){
          reqIndex = 0;
        }else if(startIndex == 0 && (startIndex+120)<totalRes){
          reqIndex = startIndex + 120;
        }else{
          rej(new Error('No More Results'))
        }
        buildParams(parameters,reqIndex)
            .then(url=> fetch(url))
            .then(res=>res.text())
            .then(text=>{
                const output = [];
                const $ = cheerio.load(text);
                let rangeFrom = $('.search-legend .rangeFrom').first().text();
                let rangeTo = $('.search-legend .rangeTo').first().text();
                let totalCount = $('.search-legend .totalcount').first().text();
                if(totalCount>0){
                  $('.result-row').each(function(index,element){
                let dataIDs = $(this).find('a').attr('data-ids')+"";
                let imgUrl = '';
                // console.log(dataIDs);
                if(dataIDs != 'undefined'){
                  const item = {};
                  dataIDs = dataIDs.substr(2,17);
                  item['imgUrl'] = `https://images.craigslist.org/${dataIDs}_300x300.jpg`;
                  item['title'] = $(this).find('.result-title').text();
                  item['price'] = $(this).find('.result-meta .result-price').text();
                  item['url'] = $(this).find('.result-title').attr('href');
                  item['dateCreated'] = $(this).find('.result-info .result-date').attr('datetime');
                  item['neighborhood'] = $(this).find('.result-meta .result-hood').text().replace(/[{()}]/g, '').trim();
                  output.push(item);
                }
              })
                }
              
              res({
                data:output,
                rangeFrom:rangeFrom,
                rangeTo:rangeTo,
                totalCount:totalCount
              });

            }).catch(error=>rej(error));
            
    });
  }

  print(){
    console.log(this.url);
  }
}

function buildParams(params,start=0){
  return new Promise((res,rej)=>{

    let keys = Object.keys(params);
    let url = `https://losangeles.craigslist.org/search/fua?s=${start}&hasPic=1&bundleDuplicates=1&searchNearby=2`;
    keys.forEach(param=>{
      switch(param){
        case 'query':{
          url+=`&query=${params[param]}`;
        }
        break;
        case 'postal':{
          url+=`&postal=${params[param]}`;
        }
        break;
        case 'search_distance':{
          url+=`&search_distance=${params[param]}`;
        }
        break;
        case 'min_price':{
          url+=`&min_price=${params[param]}`;
        }
        break;
        case 'max_price':{
          url+=`&max_price=${params[param]}`;
        }
        break;
        default:{

        }
      }
    })
    
  });
}