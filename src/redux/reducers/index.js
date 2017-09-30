import { combineReducers } from 'redux';
import BrowsingReducer from './BrowseConvoReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    core:BrowsingReducer,
    search:SearchReducer
});