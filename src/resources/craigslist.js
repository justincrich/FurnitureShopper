const cheerio = require('react-native-cheerio');
var nlp = require('compromise');

export default class CraigsList{
  constructor(){
  }

  scrapeItem(item){
    const output = {};
    const addFetch = [];
    
    return new Promise ((res,rej)=>{
      fetch(item.url)
      .then(resItemDetails => resItemDetails.text())
      .then(pageBodyResult=>{
        const $ = cheerio.load(pageBodyResult);
        output['title'] = $(`#titletextonly`).text();
        output['condition'] = $(`body > section > section > section > div.mapAndAttrs > p > span > b`).text();
        let bodyRegex = /\r?\n|\r*\s\s\s*/g;
        output['body'] = $(`#postingbody`).text().replace(bodyRegex,' ').trim();
        output['email'] = $(`body > section > section > header > div.returnemail.js-only > aside > ul > li.reply-email > p > a`).text();
        let phnExt = $(`.showcontact`).first().attr('href');
        let domainRegex =/([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/;
        let domain = item.url.match(domainRegex)[0];
        let picsJSONRegex = /^[^=]*=/;
        let start = pageBodyResult.indexOf('var imgList = [{');
        let end = pageBodyResult.indexOf(';',start);
        let picsIndex = pageBodyResult.substring(start,end);
        picsIndex = picsIndex.replace(picsJSONRegex,'').trim();

        output['images'] = Object.values(JSON.parse(picsIndex)).map(item=>{
          return item.url
        });

        res(output)

        // if(phnExt){
          
        //   let phnDomain= `https://${domain+phnExt}`;
        //   addFetch.push({
        //       type:'phone',
        //       url:phnDomain
        //     });        
        //   }
        
        
        // let emlExt = $(`#replylink`).attr('href');
        // if(emlExt){
        //   let emlDomain= `https://${domain+emlExt}`;
          
        //   addFetch.push({
        //     type:'email',
        //     url:emlDomain
        //   });
        // }
        
        // if(addFetch.length>0){
        //   Promise.all(addFetch.map(item=>{
        //     return fetch(item.url).then(resObj => resObj.text())
        //     .then(txt => {return txt})
        //   })).then(arr => {
            
        //      let fetchRes = arr.join();
        //      let $2 = cheerio.load(fetchRes);
        //      output['email'] = $2(`.mailapp`).text();

        //      output['phone'] = nlp($2(`body`).text()).phoneNumbers().data()[0].text.trim();
        //      console.log('hii',output)
             
        //      res(output)
        //   })
        // }else{
        //     res(output)
        // }
        

      })
      .catch(error=>rej(error));
    });
  }


  scrape(parameters,totalRes=120,startIndex=undefined){
    return new Promise ((res,rej)=>{
        if(startIndex>totalRes){
           rej(new Error('No More Results'));
        }
        buildParams(parameters,startIndex)
            .then(url=>fetch(url))
            .then(res=>res.text())
            .then(text=>{ 
                const output = {};
                const $ = cheerio.load(text);
                let rangeFrom = $('.search-legend .rangeFrom').first().text();
                let rangeTo = $('.search-legend .rangeTo').first().text();
                let totalCount = $('.search-legend .totalcount').first().text();
                if(totalCount>0){
                  $('.result-row').each(function(index,element){
                let dataIDs = $(this).find('a').attr('data-ids')+"";
                let imgUrl = '';
                if(dataIDs != 'undefined'){
                  const item = {};
                  dataIDs = dataIDs.substr(2,17);
                  dataIDs = dataIDs.split(/\:(.*?)\,/g)[0].replace(',','');
                  item['id'] = $(this).first().attr('data-pid');
                  item['imgUrl'] = `https://images.craigslist.org/${dataIDs}_300x300.jpg`;
                  item['title'] = $(this).find('.result-title').first().text();
                  item['price'] = $(this).find('.result-meta .result-price').first().text();
                  item['url'] = $(this).find('.result-title').first().attr('href');
                  item['dateCreated'] = $(this).find('.result-info .result-date').first().attr('datetime');
                  item['neighborhood'] = $(this).find('.result-meta .result-hood').first().text().replace(/[{()}]/g, '').trim();
                  output[item.title]=item;
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

function buildParams(params,start){
  return new Promise((res,rej)=>{

    let keys = Object.keys(params);
    let url = `https://losangeles.craigslist.org/search/fua?s=${start}&hasPic=1&bundleDuplicates=1`;
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
    res(url);
  });
}

function deets(fetchObj){
  return new Promise((resDeets,rejDeets)=>{
    let url = fetchObj.url;
    let type = fetchObj.type;
    fetch(url)
    .then(raw => raw.text())
    .then(text =>{
      let data = {};
      if(type == 'phone'){
        data['phone'] = nlp(resItemText).phoneNumbers().data()[0].text.trim();
      }else if(type == 'email'){
        let $2 = cheerio.load(text);
        data['email'] = $2('.anonemail').text();
      }
      resDeets(data);
    })
    .catch(error=>rejDeets(error))
   
  })

}

    
    
  //   // let url = fetchObj.url;
  //   // let type = fetchObj.type;
  //   console.log('url ')
  //   // fetch(url)
  //   // .then(resItemRaw=>resItemRaw.text())
  //   // .then(resItemText =>{
  //   //   let output={};
  //   //   if(type == 'phone'){
  //   //     console.log('phone')
  //   //     output['phone'] = nlp(resItemText).phoneNumbers().data()[0].text.trim();
  //   //   }else if(type == 'email'){
  //   //     // let emlCheerio = cheerio.load(resItemText);
  //   //     console.log(resItemText)
  //   //     console('email',emlCheerio('.anonemail').text())
  //   //     output['email'] = emlCheerio('.anonemail').text();
        
  //   //   }
      
  //     res('hii')
  //   // }).catch(err=>{
  //   //     rejDeets(err)
  //   // })
  // })