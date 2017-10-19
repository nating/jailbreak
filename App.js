import Expo from 'expo';
import React,  {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import * as Screens from './Screens';
import MapScreen from './Screens/Map/MapScreen';
import Teams from './Screens/Teams/Teams';
import Donate from './Screens/Donate/Donate';
import TeamCheckIn from './Screens/TeamCheckIn/TeamCheckIn';
import About from './Screens/About';
import Drawer from './Screens/Drawer';
import './globals.js';

const MapScreenNavigator = StackNavigator({
  Map: { screen: MapScreen, },
});

const TeamsScreenNavigator = StackNavigator({
  Teams: { screen: Teams },
});

const DonateScreenNavigator = StackNavigator({
  Donate: { screen: Donate },
});

const TeamCheckInScreenNavigator = StackNavigator({
  TeamCheckIn: { screen: TeamCheckIn },
});

MapScreenNavigator.navigationOptions = {
  title: 'Map',
};

TeamsScreenNavigator.navigationOptions = {
  title: 'Teams',
};

DonateScreenNavigator.navigationOptions = {
  title: 'Donate',
}

TeamCheckInScreenNavigator.navigationOptions = {
  title: 'Team Check-in',
}

const SimpleApp = DrawerNavigator({
  MapScreen: { screen: MapScreenNavigator },
  Teams: { screen: TeamsScreenNavigator },
  Donate: { screen: DonateScreenNavigator },
  TeamCheckIn: { screen: TeamCheckInScreenNavigator },
  About: { screen: About }
},
{
  drawerWidth: 130,
  contentComponent: ({navigation}) => <Drawer navigation={navigation}/>
});

export default class App extends Component {
  render() {
    return (
        <SimpleApp />
    );
  }
}
