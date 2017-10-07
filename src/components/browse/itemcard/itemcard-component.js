import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
//Styling
import formatting from '../../../styling/styles.js';

export default class ItemCard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.cardBody}>
          <LinearGradient 
            colors={['transparent','rgba(0,0,0,0.8)']}
            start={[.5,.8]}
             style={styles.linGrad}
          >
           
          </LinearGradient>
           <Image source={{uri:this.props.listing.imgUrl}}
                  style={styles.cardImg}
          />
          <View style={styles.cardInfo}>
                  <View style={styles.titlePriceBox}>
                      <Text 
                      style={styles.titleText}
                      numberOfLines={1}
                      >{this.props.listing.title}</Text>
                      <Text style={styles.priceText}>{this.props.listing.price}</Text>
                  </View>
                  <Text style={styles.neighborhood}>{this.props.listing.neighborhood}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linGrad:{
     position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height:'100%',
            zIndex:100,
            borderRadius:20
  },
  cardBody:{
    flexDirection:"column",
    display:"flex",
    alignItems:"center",
    justifyContent:'center',
    width:'100%',
    height:'90%',
    marginTop:'10%',
    borderColor:"#ddd",
    borderBottomWidth:0,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:.5,
    borderRadius:20
      
      
  },
  cardImg:{
    width:'100%',
    height: '100%',
    borderRadius:20,
    // opacity:0
    
    
  },
  cardInfo:{
    width:"100%",
    display:"flex",
    position:"absolute",
    flexDirection:"column",
    justifyContent:"flex-start",
    backgroundColor:"rgba(0,0,0,0)",
    bottom:20,
    left:10,
    zIndex:200
    
    
  },
  titlePriceBox:{
      flexDirection:"row",
      justifyContent:"flex-start",
      
      
  },
  titleText:{
    maxWidth:220,
    marginRight:10,
    fontSize: formatting.typography.sizes.heading,
    color:'#fff',
    
  },
  priceText:{
    fontSize: formatting.typography.sizes.heading,
    color:'#fff',
    fontWeight:'bold'
  },
  neighborhood:{
    fontSize: formatting.typography.sizes.subheading,
    color:'#fff'
  }
});