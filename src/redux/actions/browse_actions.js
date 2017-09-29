
import * as ActionTypes from '../actiontypes/actiontypes';


export function requestPostings(location){
    return{
        type: ActionTypes.BROWSE_REQUEST_POSTINGS,
        location:location
    }
}

export function requestPostingsError(error){
    return{
        type: ActionTypes.BROWSE_REQUEST_POSTINGS_ERROR,
        error: error
    }
}

export function receivePostings(postings){
    console.log('postings',postings)
    return{
        type: ActionTypes.BROWSE_RECEIVE_POSTINGS,
        postings:postings
    }
}

export function fetchPostings(location){
    return (dispatch)=>{
        dispatch(requestPostings(location));
        dispatch(receivePostings(
            [
        {
          imageUrl:"https://images.craigslist.org/00t0t_aBZ0FWg2quv_300x300.jpg",
          listingUrl:"https://losangeles.craigslist.org/sfv/fuo/d/black-brown-round-wood-coffee/6289749283.html",
          id:"6289749283",
          title:"Black Brown Round Wood Coffee Table TV Stand",
          price:"$75",
          neighborhood:"Sherman Oaks"
        },
        {
          imageUrl:"https://images.craigslist.org/00M0M_gfuCE5MtCaK_300x300.jpg",
          listingUrl:"https://losangeles.craigslist.org/lac/fuo/d/2-tier-vintage-table/6311540315.html",
          id:"1:00M0M_gfuCE5MtCaK,1:00g0g_9iWgvzucBMG",
          title:"2 TIER VINTAGE TABLE",
          price:"$75",
          neighborhood:"Granada Hills"
        }
      ]
        ))

    }
}