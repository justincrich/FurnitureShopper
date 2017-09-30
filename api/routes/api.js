var express = require('express');
var router = express.Router();
// const craigslist = require('node-craigslist');
var craigscraper = require('../resources/craigscraper.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"status":"ok"});
});

router.get('/furniture',function(req,res,next){
  const allowedParams = ["query","srchType","hasPic","bundleDuplicates","searchNearby","nearbyArea","search_distance","postal","min_price","max_price"];
  let paramsProvided = Object.keys(req.query);
  let analysis = paramsProvided.filter(item=>{
    return allowedParams.indexOf(item) == -1;
  });

  if(analysis.length >0){
    res.send(JSON.stringify({error:`${analysis.join(', ')} not valid parameters`}))
  }else if(typeof req.query.query === 'undefined'){
    res.send(JSON.stringify({error:`Query must be included`}))
  }else{
    let query = req.query.query;
    delete req.query['query'];
    let client = craigscraper();
    client.getItems(req.url.slice(11))
      .then(res=>{
        console.log(res);
      })
    // client = new craigslist.Client(req.query);

    //         client.search(query).then(result=>{
    //           console.log(result)
    //           res.status(200).json(result)
    //         }).catch(err=>{
    //           res.status(500).json(err);
    //         });
    
     
  }

  

});

function setParams(incoming,paramNames){
  return new Promise((resolve,reject)=>{
      let output = {};
  paramNames.forEach((item,index,arr)=>{
      switch(index){
        case 0:{
        }
        case 1:{

        }
        case 2:{

        }
        case 3:{

        }
        case 4:{

        }
        case 5:{

        }
        case 6:{

        }
        case 7:{

        }
        case 8:{

        }
        case 9:{

        }
      }
    });
  });
}

module.exports = router;
