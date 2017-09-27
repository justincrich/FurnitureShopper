import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

//Components
import ItemCard from '../../components/browse/itemcard/itemcard-component.js';
import Voter from '../../components/browse/voter/voter-component.js';
//Styling
import formatting from '../../styling/styles.js';

export default class BrowsePage extends React.Component {
    static navigationOptions = {
    header:null
  }; 

  constructor(props){
    super(props);
    this.state = {
      listings:[
        {
          imageUrl:"https://images.craigslist.org/00t0t_aBZ0FWg2quv_300x300.jpg",
          listingUrl:"https://losangeles.craigslist.org/sfv/fuo/d/black-brown-round-wood-coffee/6289749283.html",
          id:"6289749283",
          title:"Black Brown Round Wood Coffee Table TV Stand",
          price:"$75",
          neighborhood:"Sherman Oaks"
        },
        {
          imageUrl:"https://images.craigslist.org/00M0M_gfuCE5MtCaK_300x300.jpg",
          listingUrl:"https://losangeles.craigslist.org/lac/fuo/d/2-tier-vintage-table/6311540315.html",
          id:"1:00M0M_gfuCE5MtCaK,1:00g0g_9iWgvzucBMG",
          title:"2 TIER VINTAGE TABLE",
          price:"$75",
          neighborhood:"Granada Hills"
        }
      ]
    }
    this.getListing = this.getListing.bind(this);
    this.discardListing = this.discardListing.bind(this)
  } 
  getListing=()=>{
    if(this.state.listings.length>0){
      let list = this.state.listings[0];
    return (
      <ItemCard 
          listing = {list}
          onPress={()=>navigate('Details')}/>
    )
    }else{
      return (
        <View>
          <Text>End Of Listings</Text>
        </View>
      )
    }
  }
  discardListing=()=>{
    let listingArr = this.state.listings;
    listingArr.shift();
    this.setState({
      listings:listingArr
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View 
        style={styles.body}
      >
        {this.getListing()}
        <Voter discard={this.discardListing}></Voter>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: formatting.colors.backgroundcolor,
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%"
  },
});