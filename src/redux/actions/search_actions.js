import * as ActionTypes from '../actiontypes/actiontypes';
import * as craigslist from '../../resources/craigslist.js';
import CraigsList from '../../resources/craigslist';

export function requestPostings(){
    return{
        type: ActionTypes.SEARCH_REQUEST_POSTINGS,

    }
}

export function receivePostings(postingsArr,startIndex,endIndex,totalCount){
    return{
        type: ActionTypes.SEARCH_RECEIVE_POSTINGS,
        postings: postingArr,
        startIndex:startIndex,
        endIndex:endIndex,
        totalCount:totalCount

    }
}

export function requestPostingsError(error){
    return{
        type: ActionTypes.SEARCH_REQUEST_POSTINGS_ERROR,
        error: error
    }
}

export function setSearchParameters(parameters){
    return{
        type: ActionTypes.SEARCH_REQUEST_POSTINGS_ERROR,
        parameters:parameters
    }
}

export function fetchListings(parameters,searchQuery){
    return (dispatch)=>{
            dispatch(requestPostings());
            const client = new CraigsList();
            client.scrape().then(result=>{
                dispatch(receivePostings(
                        result.data,
                        result.rangeFrom,
                        result.rangeTo,
                        result.totalCount
                    ))
            }).catch(error=>dispatch(requestPostingsError(error)));
        }
}
