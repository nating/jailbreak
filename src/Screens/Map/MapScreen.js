/*
  MapScreen.js

  This page displays the map of all the teams' positions.

*/


//-----------------------------Imports----------------------------------
var globals = require('../../globals.js');
import React, { Component } from 'react';
import { Alert, Image, Platform, StyleSheet, Linking, View, ScrollView, Text, TouchableOpacity, AsyncStorage, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { Constants, Location, Permissions } from 'expo';
import TimerMixin from 'react-timer-mixin';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

//-----------------------------Component---------------------------------
export default class MapScreen extends React.Component {
  //------------------navigationOptions------------------
  static navigationOptions = function(props) {
    return {
      headerStyle: Object.assign({position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }, globals.styles.header, {backgroundColor: 'transparent'}),
        title: 'Map Screen',
        headerTitleStyle: Object.assign(globals.styles.headerTitle),
        drawerLabel: 'Map',
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
        location: { coords: {latitude: 0, longitude: 0}},
        havePermit: false,
      };
   }

//-----------------------Methods-------------------------

  componentWillMount(){
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        this.setState({havePermit:true});
      } else {
        throw new Error('Location permission not granted');
      }
  }

  getPermit(){
    this.getLocationAsync();
  }

  renderMap(){
    this.setState({havePermit: true});
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    /*
    TimerMixin.setInterval( () => {
        alert(JSON.stringify(this.state.location));
    }, 10000);
    */
  }

  onRegionChange(region) {
    this.setState({region:region });
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
    this.setState({location, region})
  }

  render() {
      if(this.state.havePermit){
        return (
          <View style={styles.container}>
            <Expo.MapView
              initialRegion={{
                latitude: 55.7202199,
                longitude: 9.45252465,
                latitudeDelta: 37.3671682,
                longitudeDelta: 51.0933290,
              }}
              onRegionChange={(region)=>{this.onRegionChange(region)}}
              style={{margin:20,height:'70%',marginTop:80}}
            />
          </View>
        )
      }
      else{
        return(
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.getPermit()}
              style={{width: 100, height: 100, position: 'absolute', top: 240, left: 40, backgroundColor: 'red'}}>
                <Text>Touch here to ask for permission.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.renderMap()}
              style={{width: 100, height: 100, position: 'absolute', top: 240, left: 240, backgroundColor: 'blue'}}>
                <Text>Touch here to render the map</Text>
            </TouchableOpacity>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor:'black',
    },
});
