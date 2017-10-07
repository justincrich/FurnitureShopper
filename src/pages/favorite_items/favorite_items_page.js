import React from 'react';
import { StyleSheet, 
        Text, 
        View,
        Image, 
        TouchableWithoutFeedback, 
        TouchableOpacity,
        TextInput,
        ListView
    } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Styling
import formatting from '../../styling/styles.js';

//Redux
import * as CoreActions from '../../redux/actions/core_actions';

class FavoritesPage extends React.Component {
    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            listings:this.ds.cloneWithRows([
                {
                  imgUrl:"https://images.craigslist.org/00t0t_aBZ0FWg2quv_300x300.jpg",
                  listingUrl:"https://losangeles.craigslist.org/sfv/fuo/d/black-brown-round-wood-coffee/6289749283.html",
                  id:"6289749283",
                  title:"Black Brown Round Wood Coffee Table TV Stand",
                  price:"$75",
                  neighborhood:"Sherman Oaks"
                },
                {
                  imgUrl:"https://images.craigslist.org/00M0M_gfuCE5MtCaK_300x300.jpg",
                  listingUrl:"https://losangeles.craigslist.org/lac/fuo/d/2-tier-vintage-table/6311540315.html",
                  id:"1:00M0M_gfuCE5MtCaK,1:00g0g_9iWgvzucBMG",
                  title:"2 TIER VINTAGE TABLE",
                  price:"$75",
                  neighborhood:"Granada Hills"
                }
              ]),
        }
        this.swipeoutBtns = [
            {
              text: 'Button'
            }
          ]
        this.styles = StyleSheet.create({
            body:{
                alignItems:'center',
                width:'100%',
                height:'100%',
                justifyContent:'center',
                flexDirection:'column',
                backgroundColor:'#fefdfc'
            },
            header:{
                flexDirection:'row',
                justifyContent:'space-between',
                width:'100%',
                marginTop:30,
                marginBottom:30,
                paddingLeft:"5%",
                paddingRight:"5%"
              },
            backContainer:{
                flexDirection:'row',
                alignItems:'center'
            },
            text:{
                color:'#282421',
                fontWeight:'bold'
            },
            backPress:{
                flexDirection:'row',
                alignItems:'center'
            },
            textNav:{
                color:'#51a1d0',
                fontWeight:'bold'
            },
            listView:{
                width:'100%',
                maxWidth:350
            },
            lineItem:{
                paddingTop:20,
                paddingBottom:20,
                borderBottomWidth:1,
                borderBottomColor:'#bebfc1',
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:'#fff',
                flex:1
            },
            imgContainer:{
                flex:1,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                marginRight:10
                
            },
            cardImg:{
                width:60,
                height:60,
                borderRadius:10,
            },
            detailsContainer:{
                flex:3
            },
            priceContainer:{
                flex:1,
                display:'flex',
                alignItems:'flex-end'
            },
            priceText:{
               fontWeight:'600',
               fontSize:formatting.typography.sizes.subheading,
               color:formatting.colors.primarytextcolor
            },
            titleText:{
                fontWeight:'600',
                fontSize:formatting.typography.sizes.subheading,
                width:'100%',
                color:formatting.colors.primarytextcolor
            },
            neighborhoodText:{
                fontSize:formatting.typography.sizes.body,
                color:formatting.colors.secondarytextcolor
            },
            rowDelete: {
                alignItems: 'center',
                backgroundColor:'red',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 15,
                width:'50%',
                marginLeft:'auto'
            },

        });
        this.deleteListing = this.deleteListing.bind(this);
    }

    deleteListing(itemId){
        console.log(itemId);
        let deleteLike = this.props.Actions.deleteLike;
        setTimeout(function(){ deleteLike(itemId); }, 500);
        
    }
 
    render() {
        return (
                <View
                    style={this.styles.body}
                >
                    <View style={this.styles.header}>
                        <View style={this.styles.backContainer}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.goBack()}
                            style={this.styles.backPress}
                        >
                            <Icon 
                                color='#51a1d0'
                                name='navigate-before'
                                size={35}
                            ></Icon>
                            <Text
                                style={this.styles.textNav}
                            >
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TextInput></TextInput>
                        </View>
                    </View>
                    <SwipeListView
                        style={this.styles.listView}
                        dataSource={this.ds.cloneWithRows(Object.values(this.props.data.core.likedListings))}
                        closeOnRowBeginSwipe={true}
                        renderRow={(listing)=>{
                            return(
                                <TouchableWithoutFeedback 
                                    onPress={()=>console.log(`Press ${listing.id}`)}
                                >
                                    <View 
                                        id={listing.id}
                                        style={this.styles.lineItem}
                                    >
                                    <View style={this.styles.imgContainer}>
                                        <Image source={{uri:listing.imgUrl}}
                                                style={this.styles.cardImg}
                                        />
                                    </View>
                                        <View style={this.styles.detailsContainer}>
                                            <Text style={this.styles.titleText}>{listing.title}</Text>
                                            <Text style={this.styles.neighborhoodText}>{listing.neighborhood}</Text>
                                        </View>
                                        <View style={this.styles.priceContainer}>
                                        <Text style={this.styles.priceText}>{listing.price}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                        renderHiddenRow={ (data, secdId, rowId, rowMap) => (
                                <TouchableWithoutFeedback
                                    onPress={()=>{
                                            rowMap[`${secdId}${rowId}`].closeRow()
                                            this.deleteListing(data.id);
                                        }}
                                >
                                    <View style={this.styles.rowDelete}>
                                        <Text>Delete</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
            leftOpenValue={0}
            rightOpenValue={-75}
                    >
                        
                    

                    </SwipeListView>
                </View>
        );
    }
}

const mapStateToProps = state =>{
    
     return(
     {
       data:{
           core:state.core
   
       }
     }
)};

const mapDispatchToProps = dispatch=>{
    return{
        Actions: bindActionCreators(CoreActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FavoritesPage);