//Dependencies
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Components
import ItemCard from '../../components/browse/itemcard/itemcard-component.js';
import Voter from '../../components/browse/voter/voter-component.js';

//Redux Handlers
import * as ActionTypes from '../../redux/actiontypes/actiontypes';
import * as CoreActions from '../../redux/actions/core_actions';

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
      searchResults:[]
    }
    this.getListings = this.getListings.bind(this);
    this.discardListing = this.discardListing.bind(this);
    this.actionSwipeRight = this.actionSwipeRight.bind(this);
    this.actionSwipeLeft = this.actionSwipeLeft.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.leftSwipeCallback = this.leftSwipeCallback.bind(this);
    this.rightSwipeCallback = this.rightSwipeCallback.bind(this);
    this.swipeUpCallback = this.swipeUpCallback.bind(this);
    this.loadBrowser = this.loadBrowser.bind(this);
  } 

  loadBrowser(){
    

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
    this.props.Actions.hatePosting(this.state.searchResults[index]);
  }
  rightSwipeCallback(index){
    this.props.Actions.likePosting(this.state.searchResults[index]);
  }
  swipeUpCallback(index){
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
    let results = Object.values(this.props.data.search.results);
    this.setState({
      searchResults: results
    })
  }
  /* cards={this.props.data.search.results} */
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.body}>
        {
          Object.keys(this.props.data.search.results).length >0 ?
            <Swiper
              ref={swiper=>{this.swiper=swiper}}
              
              cards={this.state.searchResults}
              renderCard={this.getListings}
              backgroundColor={'#fefdfc'}
              onSwipedLeft={this.leftSwipeCallback}
              onSwipedRight={this.rightSwipeCallback}
              onSwipedTop={this.swipeUpCallback}
            
            >
            </Swiper>
            :
            <Text
              color='#0a3341'
              style={styles.text}
            >
              No Results
            </Text>
        }
        <View style={styles.header}>
              <TouchableOpacity
                onPress={()=>this.props.navigation.goBack()}
              >
                <View style={styles.backContainer}>
                  <Icon 
                    color='#51a1d0'
                    name='navigate-before'
                    size={35}
                    
                  ></Icon>
                  <Text
                    style={styles.textNav}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>console.log('go list')}
              >
                <Icon 
                color='#51a1d0'
                    name='view-list'
                    type='material-community'
                    size={35}
                    
                ></Icon>
              </TouchableOpacity>
          </View>
          <Voter  
          style={styles.footer}
          swipeRight={this.actionSwipeRight} swipeLeft={this.actionSwipeLeft}></Voter>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  body:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:formatting.colors.backgroundcolor,
    width:'100%',
    height:'100%',
    flexDirection:'column'
  },
  header:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    position:"absolute",
    top:30,
    paddingLeft:"5%",
    paddingRight:"5%"
  },
  backContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  footer:{
    flex:1
  },
  text:{
    color:'#282421',
    fontWeight:'bold'
  },
  textNav:{
    color:'#51a1d0',
    fontWeight:'bold'
  }
});

const mapStateToProps = state =>{
 
  return(
  {
    data:{
        core:state.core,
        search:state.search

    }
  }
)};

const mapDispatchToProps = dispatch=>{
  return{
    Actions: bindActionCreators(CoreActions,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BrowsePage);
