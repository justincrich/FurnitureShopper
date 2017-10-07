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
            color='#51a1d0'
            size={40}
            containerStyle={styles.iconContainer}
          ></Icon>
          <Icon
            name='heart-outline'
            type='material-community'
            onPress={this.props.swipeRight}

            size={40}
            containerStyle={styles.iconContainer}
            color="#e53424"
          ></Icon>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    position:'absolute',
    flexDirection:'row',
    bottom:15
  },
  iconContainer:{
    marginLeft:50,
    marginRight:50
  }
});