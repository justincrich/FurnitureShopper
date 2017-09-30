import * as ActionTypes from '../actiontypes/actiontypes';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
    results:[],
    fetching:false,
    error:null,
    parameters:{},
    query:''
}

export default function SearchReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.SEARCH_REQUEST_POSTINGS:{
        return {
            ...state,
            fetching:true
        }
    }
    case ActionTypes.SEARCH_RECEIVE_POSTINGS:{
        return {
            ...state,
            fetching:false,
            results:action.postings,
        }
    }
    case ActionTypes.SEARCH_REQUEST_POSTINGS_ERROR:{
        return {
            ...state,
            fetching:false,
            error:action.error
        }
    }
    case ActionTypes.SEARCH_SET_PARAMETERS:{
        return {
            ...state,
            parameters:action.parameters
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

