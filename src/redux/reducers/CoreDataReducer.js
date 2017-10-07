import * as ActionTypes from '../actiontypes/actiontypes';
import {REHYDRATE} from 'redux-persist/constants';


const initialState = {
    likedListings:{

    },
    hatedListings:{

    },
    error:undefined,
    selectedListing:undefined,
    fetching:false
}

export default function CoreDataReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.BROWSE_SAVE_LIKE:{
        let newListings = {...state.likedListings};
        newListings[action.posting.id] = action.posting;
        return {
            ...state,
            likedListings:newListings
        }
    }
    case ActionTypes.BROWSE_SAVE_HATE:{
        let posting ={};
        console.log('posting in reducer ',action.posting)
        let id = action.posting.id;
        posting[id]=action.posting;
        return {
            ...state,
            hatedListings:{
                    ...state.hatedListings,
                    id:action.posting
            }
        }
    }
    case ActionTypes.BROWSE_DELETE_LIKE:{
        let temp = {...state.likedListings};
        delete temp [action.id];
        return {
            ...state,
            likedListings:temp
        }
    }
    case ActionTypes.CORE_ERROR:{
        return {
            ...state,
            error:action.error
        }
    }
    case ActionTypes.REQUEST_LISTING_DETAILS:{
        return {
            ...state,
            fetching:true,
            error:false
        }
    }
    case ActionTypes.RECEIVE_LISTING_DETAILS:{
        return {
            ...state,
            fetching:false,
            selectedListing:action.listingDetails
        }
    }
    case ActionTypes.CLEAR_SELECTED_LISTING:{
        return {
            ...state,
            selectedListing:undefined
        }
    }
    case REHYDRATE:{
        let incoming = action.payload.myReducer;
        if(incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)};
        return state;
    }
    default:
      return state;
  }

}

