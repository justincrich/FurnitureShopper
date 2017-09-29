//Dependencies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-deck-swiper';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Components
import ItemCard from '../../components/browse/itemcard/itemcard-component.js';
import Voter from '../../components/browse/voter/voter-component.js';

//Redux Handlers
import * as ActionTypes from '../../redux/actiontypes/actiontypes';
import * as BrowserActions from '../../redux/actions/browse_actions';

//Styling
import formatting from '../../styling/styles.js';

class BrowsePage extends React.Component {
    static navigationOptions = {
    header:null
  }; 
  swiper = null;

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
      ],

    }
    this.getListings = this.getListings.bind(this);
    this.discardListing = this.discardListing.bind(this);
    this.actionSwipeRight = this.actionSwipeRight.bind(this);
    this.actionSwipeLeft = this.actionSwipeLeft.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.leftSwipeCallback = this.leftSwipeCallback.bind(this);
    this.rightSwipeCallback = this.rightSwipeCallback.bind(this);
    this.swipeUpCallback = this.swipeUpCallback.bind(this);
  } 
  getListings=(listing)=>{
    return(
      <ItemCard key={listing.id} 
           listing = {listing}
           onPress={()=>navigate('Details')}/>
    )
  }
  actionSwipeRight(){
    this.swiper.swipeRight();
  }
  actionSwipeLeft(){
    this.swiper.swipeLeft();
  }
  leftSwipeCallback(index){
    
  }
  rightSwipeCallback(index){
    
  }
  swipeUpCallback(index){
    console.log('swip details')
  }
  getInfo(){

  }


  discardListing=()=>{
    let listingArr = this.state.listings;
    listingArr.shift();
    this.setState({
      listings:listingArr
    })
  }
  componentWillMount(){
    this.props.Actions.fetchPostings('dallas');
    console.log('will mount',this.props)
  
  }
  render() {
    //Redux Variables
    const { navigate } = this.props.navigation;
    // const {allListings,fetching,error,location} = this.props.browse;
    console.log('render',this.props)
    return (

      <View>
        {this.props.browse.fetching?
          <Text>Loading</Text>
          :
          <View style={styles.body}>
                      <Swiper
          ref={swiper=>{this.swiper=swiper}}
          cards={allListings}
          renderCard={this.getListings}
          backgroundColor={formatting.colors.backgroundcolor}
          onSwipedLeft={this.leftSwipeCallback}
          onSwipedRight={this.rightSwipeCallback}
          onSwipedTop={this.swipeUpCallback}
        > 
      </Swiper>
      <View style={styles.header}>
            <Icon 
              
              name='settings'
              type='material-community'
              size='35'
              onPress={()=>console.log('press')}
            ></Icon>
            <Icon 
                
                name='view-list'
                type='material-community'
                size='35'
            ></Icon>
        </View>
        <Voter nav = {navigate} swipeRight={this.actionSwipeRight} swipeLeft={this.actionSwipeLeft}></Voter>
      </View>
        }
      </View>
            
    )
  }
}

const styles = StyleSheet.create({
  body:{
    alignItems:'center',
    backgroundColor:formatting.colors.backgroundcolor,
    width:'100%',
    height:'100%'
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    position:"absolute",
    top:30,
    paddingLeft:"5%",
    paddingRight:"5%"
  }
});

const mapStateToProps = state =>{
  console.log('map',state)
  return(
  {
    browse:state.browse
  }
)};

const mapDispatchToProps = dispatch=>{
  return{
    Actions: bindActionCreators(BrowserActions,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BrowsePage);

/*
        {fetching ?
          <Text>Loading</Text>
          :

        }
*/