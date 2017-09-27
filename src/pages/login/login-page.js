import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LoginPage extends React.Component {
  static navigationOptions = {
    header:null
  }; 
  
  render() {
    const { navigate } = this.props.navigation;
    return <Text>Login</Text>;
  }
}