import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
          <View style={styles.iconContainer}>
            <Icon
            name='close'
            type='material-community'
            iconStyle={styles.closeIcon}
            onPress={this.props.discard}
          ></Icon>
          </View>
          <View style={styles.iconContainer}>
            <Icon
            name='information-variant'
            type='material-community'
            iconStyle={styles.infoIcon}
            ></Icon>
          </View>
          <View style={styles.iconContainer}>
            <Icon
            name='heart-outline'
            type='material-community'
            iconStyle={styles.heartIcon}
          ></Icon>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    position:"absolute",
    minWidth:300,
    width:'60%',
    bottom:0,
    marginBottom:20,
    flexDirection:"row",
    justifyContent:"space-around",
  },
  iconContainer:{
    backgroundColor:"#fff",
    borderRadius:200,
    width:80,
    height:80,
    justifyContent: 'center',
    alignItems:'center',
    borderColor:"#ddd",
    borderBottomWidth:0,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:.5,
    shadowRadius:2,
    elevation: 1,
  },
  heartIcon:{
    color:"red",
    fontSize:40,
    top:1
  },
  infoIcon:{
    fontSize:40
  },
  closeIcon:{
    fontSize:40
  },
});