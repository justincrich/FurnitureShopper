import * as ActionTypes from '../actiontypes/actiontypes';
import {REHYDRATE} from 'redux-persist/constants';

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
            fetching:action.fetching,
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
            allListings:action.postings
        }
        
    }
    case ActionTypes.BROWSE_SAVE_LIKE:{
        let posting = state.allListings[action.postingIndex];
        let id = posting.id;
        
        return {
            ...state,
            likedListings:{
                    ...state.likedListings,
                    id:posting
            }
        }
    }
    case ActionTypes.BROWSE_SAVE_HATE:{
        let posting = state.allListings[action.postingIndex];
        let id = posting.id;
        return {
            ...state,
            hatedListings:{
                    ...state.hatedListings,
                    id:posting
            }
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

