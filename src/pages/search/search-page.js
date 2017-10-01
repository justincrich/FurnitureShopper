import React from 'react';
import { StyleSheet, Text, View, TextInput, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchActions from '../../redux/actions/search_actions';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';

class SearchPage extends React.Component {
    constructor(props){
    super(props)
    this.state= {
        searchText:'',
        inputColor:'black',
        query:null
    }

    this.styles = StyleSheet.create({
        body:{
            alignItems:'center',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            flexDirection:'column'
        },
        wrapper:{},
        searchContainer:{
            flexDirection:'row',
            margin:15
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
            marginRight:10
        },
        searchParamContainer:{
            margin:15
        },
        slideButton:{

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
            (nextProps.search.results.length>0)
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
            {/*{this.props.search.results.length>0 &&
                navigate('Results')
            }*/}
            <View style={this.styles.body}>
                <View style={this.styles.searchContainer}>
                    <Icon 
                        name='search'
                        size='60'
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
                        
                    />
                </View>
                <View style={this.styles.searchParamContainer}>
                    <Icon 
                    name='keyboard-arrow-up'
                    size='30'
                    iconStyle={this.styles.searchIcon}
                    onPress={this.submitSearch}
                    />
                    <Text>Swipe up to set search parameters</Text>
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