import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//Styling
import formatting from '../../../styling/styles.js';

export default class ItemCard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <Image source={{uri:this.props.listing.imageUrl}}
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
        </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width:'60%',
    height:'50%',
    minWidth:300,
    minHeight:430,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    bottom: 30,
    alignItems:"center",
      justifyContent:'center'
  },
  cardBody:{
      padding:'20%',
      flexDirection:"column",
      display:"flex",
      alignItems:"center",
      justifyContent:'center'
  },
  cardImg:{
    width:'100%',
    minWidth:250,
    minHeight:250,
    marginBottom:'20%'
  },
  cardInfo:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
  },
  titlePriceBox:{
      flexDirection:"row",
      maxWidth:300,
      justifyContent:"center",
      marginBottom:10
  },
  titleText:{
    maxWidth:180,
    marginRight:10,
    fontSize: formatting.typography.sizes.heading,
  },
  priceText:{
    fontSize: formatting.typography.sizes.heading
  },
  neighborhood:{
    fontSize: formatting.typography.sizes.subheading
  }
});