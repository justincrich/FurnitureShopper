import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchActions from '../../redux/actions/search_actions';

class SearchPage extends React.Component {
    constructor(props){
    super(props)
  }
    static navigationOptions = {
    header:null
  };
  
  render() {
    return <Text>Search Page</Text>;
  }
}

function mapStateToProps(state){
    // console.log('SEARCH STATE',state)
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