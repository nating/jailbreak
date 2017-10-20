import Expo from 'expo';
import React,  {Component} from 'react';
import { StatusBar,Image, AsyncStorage, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import {StackNavigator,DrawerNavigator,NavigationActions,Navigation} from 'react-navigation';
import {LinearGradient} from 'expo';


export default class Drawer extends React.Component {
    static navigationOptions = function(props) {
      return {
      }
    };
  //---------------------Constructor-----------------------
   constructor(props) {
      super();
      this.state = {
      }
    }

    openScreen(screen){
      this.props.navigation.navigate(screen);
    }

  render() {
  return (
    <View style={styles.container}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
      <TouchableOpacity onPress={()=>this.openScreen('Map')} style={styles.pageButton}><Text style={styles.pageButtonText}>Map</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.openScreen('Teams')} style={styles.pageButton}><Text style={styles.pageButtonText}>Teams</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.openScreen('Donate')} style={styles.pageButton}><Text style={styles.pageButtonText}>Donate</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.openScreen('About')} style={styles.pageButton}><Text style={styles.pageButtonText}>About</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.openScreen('TeamCheckIn')} style={styles.pageButton}><Text style={styles.pageButtonText}>Team Check-in</Text></TouchableOpacity>
    </View>
  );
  }
}

let styles = {
  pageButton: {
    height: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
    //backgroundColor: '#ff8207',
    marginBottom: 3,
  },
  pageButtonText:{
    color: 'white',
  },
  list: {
    backgroundColor: 'black',
  },
  container: {
    backgroundColor:'black',
    height:'100%',
  },
  icon: {
    width: 34,
    textAlign: 'center',
    marginRight: 16
  },
};
