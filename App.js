import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

//components
import BrowsePage from './src/pages/browse/browse-page.js';
import DetailsPage from './src/pages/itemdetails/itemdetails-page.js';
import LoginPage from './src/pages/login/login-page.js';
//Routes
export default App = StackNavigator({
  Home: { 
    screen: BrowsePage,
  },
  Details: { screen: DetailsPage},
  Login: { screen:LoginPage}
});
