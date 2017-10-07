import React from 'react';
import { StyleSheet, Text, View, TextInput, ListView, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchActions from '../../redux/actions/search_actions';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo';
let backgroundImg = require('../../img/lr1.jpg');

class SearchPage extends React.Component {
    constructor(props){
    super(props)
    this.state= {
        searchText:'',
        inputColor:'#fff',
        query:null
    }

    this.styles = StyleSheet.create({
        body:{
            alignItems:'center',
            flex:1,
            justifyContent:'center',
            flexDirection:'column',
            backgroundColor:'#091b22'
        },
        background:{
            flex:1,
            resizeMode:'cover',
            position:'absolute',
            zIndex:1
        },
        opacity:{
            position:'absolute',
            backgroundColor:'black',
            width:'100%',
            height:'100%',
            zIndex:2,
            opacity:.3
        },
        wrapper:{},
        searchContainer:{
            flexDirection:'row',
            margin:15,
            zIndex:3
        },
        searchTextField:{
            height: 60,
            width:'75%',
            maxWidth:300,
            color:this.state.inputColor,
            fontSize:40,
            
        },
        searchIcon:{
            color:this.state.inputColor,
            marginRight:10,
            color:'#fff'
        },
        searchParamContainer:{
            margin:15,
            zIndex:3,
        },
        slideButton:{

        },
        paramPrompt:{
            color:'#fff',
            backgroundColor:'transparent'
        },
        list:{
            zIndex:3,
            position:'absolute',
            top:30,
            right:30
        }
    });
    this.submitSearch = this.submitSearch.bind(this);
  }
    static navigationOptions = {
    header:null
  };

  submitSearch(){
    this.props.SearchActions.fetchListings({
        query:this.state.searchText,
        index:0
    });

  }

  componentWillReceiveProps(nextProps){
      if(this.props.search.fetching && 
            nextProps.search.fetching == false
            &&
            (Object.keys(nextProps.search.results).length>0)
        ){
            const { navigate } = nextProps.navigation;
            navigate('Results');
        }
  }

  componentWillUnmount(){
      this.props.SearchActions.resetSearch();

  }

  componentWillMount(){
    this.props.SearchActions.resetSearch();
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
        <Swiper
            horizontal={false}
            loop={false}
            showsButtons={false}
            showsPagination={false}
            buttonWrapperStyle={this.styles.slideButton}
        >
            <View style={this.styles.body}>
                <View style={this.styles.opacity}/>
                <Image
                    style={this.styles.background}
                    source={backgroundImg}
                />
                <Icon 
                    color='#FFF'
                    name='view-list'
                    type='material-community'
                    style={this.styles.list}
                    size={35}
                    onPress={()=>navigate('Favorites')}
                ></Icon>
                <View style={this.styles.searchContainer}>
                    <Icon 
                        name='search'
                        size={60}
                        iconStyle={this.styles.searchIcon}
                    ></Icon>
                    <TextInput
                        style={this.styles.searchTextField}
                        onChangeText={(text) => this.setState({
                            searchText:text
                        })}
                        placeholder='Search'
                        value={this.state.text}
                        placeholderTextColor={this.state.inputColor}
                        returnKeyType='search'
                        onSubmitEditing={this.submitSearch}
                        underlineColorAndroid = {this.state.inputColor}
                        selectionColor = {this.state.inputColor}
                        
                    />
                </View>
                <View style={this.styles.searchParamContainer}>
                    <Icon 
                    name='keyboard-arrow-up'
                    size={30}
                    iconStyle={this.styles.searchIcon}
                    onPress={this.submitSearch}
                    />
                    <Text
                    style={this.styles.paramPrompt}
                    >Swipe up to set search parameters</Text>
                </View>
            </View>
            <View>
                <Text>Hii</Text>
            </View>
        </Swiper>
    );
  }
  
}

function mapStateToProps(state){
    return {
        search: state.search,
        core:{
            hatedListings:state.core.hatedListings,
            likedListings:state.core.likedListings
        }
    }
}





function matchDispatchToProps(dispatch){
    return {
        SearchActions: bindActionCreators(SearchActions,dispatch)
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchPage);