import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';

//components
import SearchPage from './src/pages/search/search-page.js';
import SearchParams from
'./src/pages/search/search-params.js';
import BrowsePage from './src/pages/browse/browse-page.js';
import DetailsPage from './src/pages/itemdetails/itemdetails-page.js';
import LoginPage from './src/pages/login/login-page.js';


//Setup routes
var AppNavigator = StackNavigator({
  Search:{
    screen:SearchPage
  },
  SearchParams:{
    screen: SearchParams
  },
  Results: { 
    screen: BrowsePage,
  },
  Details: { screen: DetailsPage},
  Login: { screen:LoginPage}
},{
  initialRouteName:'Search'
}
);

//put it all together
class Root extends React.Component{
  render()
{
  return(
    <Provider store={store}>
      <AppNavigator
        initialRouteName={'Details'}
      />
    </Provider>
  )
}}

export default Root;

console.disableYellowBox = true;