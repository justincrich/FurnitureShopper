import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

//Styling
import formatting from '../../../styling/styles.js';

export default class Voter extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <View style={styles.container}>
          <Icon
            name='close'
            type='material-community'
            onPress={this.props.swipeLeft}
            raised={true}
            size={40}
            containerStyle={styles.iconContainer}
          ></Icon>
          <Icon
            name='heart-outline'
            type='material-community'
            onPress={this.props.swipeRight}
            raised={true}
            size={40}
            containerStyle={styles.iconContainer}
            color="red"
          ></Icon>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    position:'absolute',
    bottom:30,
    flexDirection:'row',
  },
  iconContainer:{
    marginLeft:25,
    marginRight:25
  }
});