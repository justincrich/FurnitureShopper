
import {AsyncStorage,} from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //allows you to write action creators that return a function instead of an action
import { createLogger } from 'redux-logger'; //logs out state in console
import reducers from '../reducers/index';
import {persistStore, autoRehydrate} from 'redux-persist';

const logger = createLogger();
const initialState ={}
export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
  );

 persistStore(store,{
     storage:AsyncStorage,
     blacklist:['search']
    });

// let store = compose(
//     applyMiddleware(thunk),
//     autoRehydrate()
// )(createStore)(reducers);

