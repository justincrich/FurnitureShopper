import * as ActionTypes from '../actiontypes/actiontypes';
import * as craigslist from '../../resources/craigslist.js';
import CraigsList from '../../resources/craigslist';

export function requestPostings(index){
    return{
        type: ActionTypes.SEARCH_REQUEST_POSTINGS,
        startIndex:index

    }
}

export function receivePostings(postingsArr,startIndex,endIndex,totalCount){
    return{
        type: ActionTypes.SEARCH_RECEIVE_POSTINGS,
        postings: postingsArr,
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

export function resetSearch(){
    return{
        type: ActionTypes.SEARCH_RESET_QUERY
    }
}

export function fetchListings(parameters,index){
    return (dispatch)=>{
            dispatch(requestPostings(index));
            const client = new CraigsList();
            client.scrape(parameters,index).then(result=>{
                dispatch(receivePostings(
                        result.data,
                        result.rangeFrom,
                        result.rangeTo,
                        result.totalCount
                ))
            }).catch(error=>dispatch(requestPostingsError(error)));
    }
}
