import * as ActionTypes from '../actiontypes/actiontypes';

const initialState = {
    allListings:[],
    likedListings:{

    },
    hatedListings:{

    },
    fetching:false,
    error:null,
    location:null
}

export default function BrowsingReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.BROWSE_REQUEST_POSTINGS:{
        return {
            ...state,
            fetching:true,
            location:action.location
            }
    }
    case ActionTypes.BROWSE_REQUEST_POSTINGS_ERROR:{
        return {
                ...state,
                fetching:false,
                error:action.error
            }
    }
    case ActionTypes.BROWSE_RECEIVE_POSTINGS:{
        return {
            ...state,
            fetching:false,
            allListings:[...action.postings]
        }
        
    }
    default:
      return state;
  }

}

