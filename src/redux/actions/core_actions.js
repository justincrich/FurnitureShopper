
import * as ActionTypes from '../actiontypes/actiontypes';
import {CraigsList} from '../../resources/craigslist.js';


export function likePosting(posting){
    return{
        type: ActionTypes.BROWSE_SAVE_LIKE,
        posting:posting
    }
}

export function hatePosting(posting){
    return{
        type: ActionTypes.BROWSE_SAVE_HATE,
        posting:posting
    }
}

export function deleteLike(postingID){
    return{
        type: ActionTypes.BROWSE_DELETE_LIKE,
        id:postingID
    }
}

function requestListingDetails(listingID){
    return{
        type: ActionTypes.REQUEST_LISTING_DETAILS,
        listingID:listingID
    }
}

function receiveListingDetails(listingDetails){
    return{
        type: ActionTypes.REQUEST_LISTING_DETAILS,
        listingDetails:listingDetails
    }
}

function coreError(error){
    return{
        type: ActionTypes.CORE_ERROR,
        error:error
    }
}

function clearSelectedListing(){
    return {
        type: ActionTypes.CLEAR_SELECTED_LISTING
    }
}

export function fetchListing(listing){
    dispatch(requestListingDetails(listing.id));
    const client = new CraigsList();
    client.scrapeItem(listing.url)
    .then(result=>dispatch(receiveListingDetails(result)))
    .catch(error=>dispatch(coreError(error)))
}
