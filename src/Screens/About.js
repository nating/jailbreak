/*
  About.js

  This page displays information about jailbreak.

*/


//-----------------------------Imports----------------------------------
var globals = require('../globals.js');
import React, { Component } from 'react';
import { Alert, Image, Platform, StyleSheet, Linking, View, ScrollView, Text, TouchableOpacity, AsyncStorage, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';


//-----------------------------Component---------------------------------
export default class About extends React.Component {
  //------------------navigationOptions------------------
  static navigationOptions = function(props) {
    return {
      headerStyle: Object.assign({position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }, globals.styles.header, {backgroundColor: 'transparent'}),
        title: 'About',
        headerTitleStyle: Object.assign(globals.styles.headerTitle),
        drawerLabel: 'About',
      headerLeft:(
        <TouchableOpacity style={{paddingHorizontal:15}} onPress={() => props.navigation.navigate('DrawerOpen')}>
          <Ionicons color='white' size={30} name='ios-menu'/>
        </TouchableOpacity>
      ),
    }
  };

//---------------------Constructor-----------------------
   constructor(props) {
      super();
      this.state = {
      };
   }

//-----------------------Methods-------------------------

  componentWillMount(){
  }

//---------------------Rendering-----------------------
  render() {
  	return(
      <View style={styles.container}>
      </View>
  	);
  }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor:'black',
    },
    backButtonIcon:{
      zIndex:1,
      backgroundColor:'transparent',
      position:'absolute',
      top:15 + Expo.Constants.statusBarHeight,
      left:15,
    },
});
