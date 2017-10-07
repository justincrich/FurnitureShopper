import { combineReducers } from 'redux';
import CoreDataReducer from './CoreDataReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    core:CoreDataReducer,
    search:SearchReducer
});