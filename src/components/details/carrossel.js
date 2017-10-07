import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import formatting from '../../styling/styles.js';
import Swiper from 'react-native-swiper';


export default function Carrossel(props){

    return(
        <View style={styles.body}>
            <Swiper 
            horizontal={true}
            style={styles.swiper}
            dotColor="white"
            activeDotColor="#6C2C2A"
            >
                {getImages(props.imgLinks)}
            </Swiper>
        </View>
    )
}

function getImages(imageArr){
    return (imageArr.map(img =>{
        return(
            <Image
                style={styles.img}
                source={{uri:img}}
            />
        );
    }))
};

const styles = StyleSheet.create({
    body:{
      width:"100%",
      maxWidth:500,
      height:300,
      backgroundColor:'transparent',
      alignItems:'center',
      marginTop:70,
      borderColor:"#ddd",
      borderBottomWidth:0,
      shadowColor:'#000',
      shadowOffset:{width:0,height:2},
      shadowOpacity:.5,
    },
    img:{
        flex:1,
        borderRadius:20,
        margin:10,
        
    },
    swiper:{}
  });