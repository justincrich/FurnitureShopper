import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CraigsList from '../../resources/craigslist.js';
import { Icon } from 'react-native-elements';
//Styling
import formatting from '../../styling/styles.js';
import Swiper from 'react-native-swiper';

//components
import Carrossel from '../../components/details/carrossel.js'

export default class DetailsPage extends React.Component {
    static navigationOptions = {
    header:null
  }; 
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
    this.styles = StyleSheet.create({
      body:{
        flex:1,
        backgroundColor:formatting.colors.backgroundcolor,
        
        
      },
      miniBody:{
        padding:10,
        flex:1,
        height:'100%',
        flexDirection:'column',
        alignItems:'flex-start'
 
      },
      headerTitle:{
        color:formatting.colors.accentcolor,
        fontSize:formatting.typography.sizes.subheading,
        fontWeight:'bold'
      },
      header:{
          position:'absolute',
          top:30,
          left:0,
          right:0,
          height:30,
          paddingLeft:"5%",
          paddingRight:"5%",
          display:'flex',
          zIndex:10,
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'row'

      },
      backButton:{
        position:'absolute',
        color:formatting.colors.primarytextcolor,
        left:0,
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center',
        fontSize:formatting.typography.sizes.heading
        
      },
      textHeading:{
        color:formatting.colors.primarytextcolor
      },
      listingDetailsText:{
        color:formatting.colors.primarytextcolor,
        fontSize:formatting.typography.sizes.heading,
        fontWeight:'500'
        
      },
      detailsContainer:{
        marginTop:10,
        maxWidth:500,
        padding:10,
      }

    });
  }

  componentWillMount(){
    let cl = new CraigsList();
    
    cl.scrapeItem({url:`https://losangeles.craigslist.org/sfv/fuo/d/office-furniture-swivel-chair/6332475267.html`})
    .then(detailsData=>{this.setState({data:detailsData})})
    .catch(error =>{
      console.error('Error In Item Details: ',error.message)
    });
  }
  render() {
    return (
      <View style={this.styles.body}>
        <View style={this.styles.header}>
          <TouchableOpacity 
            onPress={()=>this.props.navigation.goBack()}
            style={this.styles.backButton}>
            <Icon
              color={formatting.colors.accentcolor}
              name='navigate-before'
              size={35}
            ></Icon>
            <Text style={this.styles.headerTitle} >Back</Text>
          </TouchableOpacity>      
          <Text style={this.styles.headerTitle}>Item Details</Text>

        </View>
        {
          Object.keys(this.state.data).length > 0 ?
          <View style={this.styles.miniBody}>
            <Carrossel imgLinks={this.state.data.images}/>
            <View style={this.styles.detailsContainer}>
                <Text style={this.styles.listingDetailsText}>
                  {this.state.data.title}
                </Text>
            </View>
          </View>
          :
          <Text>Not Here</Text>
        }
      </View>
    )
  }
}