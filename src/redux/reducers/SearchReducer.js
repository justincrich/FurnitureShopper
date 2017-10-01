import * as ActionTypes from '../actiontypes/actiontypes';

const initialState = {
    results:[],
    fetching:false,
    error:null,
    parameters:{},
    query:'',
    startIndex:undefined,
    endIndex:undefined,
    totalCount:undefined
}

export default function SearchReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.SEARCH_REQUEST_POSTINGS:{
        return {
            ...state,
            fetching:true,
            startIndex:action.startIndex,
            error:null,
            results:[]
        }
    }
    case ActionTypes.SEARCH_RECEIVE_POSTINGS:{
        return {
            ...state,
            fetching:false,
            results:action.postings,
            startIndex:action.startIndex,
            endIndex:action.endIndex,
            totalCount:action.totalCount
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
    case ActionTypes.SEARCH_RESET_QUERY:{
        return {
            results:[],
            fetching:false,
            error:null,
            parameters:{},
            query:'',
            startIndex:undefined,
            endIndex:undefined,
            totalCount:undefined
        }
    }
    default:
      return state;
  }

}

