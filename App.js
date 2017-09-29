import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import {Provider, connect} from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

//Redux Reducers
import BrowseConvoReducer from './src/redux/reducers/BrowseConvoReducer';

//components
import BrowsePage from './src/pages/browse/browse-page.js';
import DetailsPage from './src/pages/itemdetails/itemdetails-page.js';
import LoginPage from './src/pages/login/login-page.js';

//Routes
var AppNavigator = StackNavigator({
  Home: { 
    screen: BrowsePage,
  },
  Details: { screen: DetailsPage},
  Login: { screen:LoginPage}
});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

const navReducer = (state=initialState,action)=>{
  const nextState = AppNavigator.router.getStateForAction(action,state);
  return nextState || state;
}

const appReducer = combineReducers({
  nav: navReducer,
  browse: BrowseConvoReducer,
});

class App extends React.Component{
  render(){
    return(
      <AppNavigator navigation={addNavigationHelpers({
        dispatch:this.props.dispatch,
        state:this.props.nav
      })}
      
      />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer,applyMiddleware(thunkMiddleware));

class Root extends React.Component{
  render()
{
  return(
    <Provider store={store}>
        <AppWithNavigationState store={store} />
      </Provider>
  )
}}

export default Root;

console.disableYellowBox = true;