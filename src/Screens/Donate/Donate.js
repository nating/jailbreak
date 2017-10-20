/*
  Donate.js

  This is the page presented to users who wish to donate to Jailbreak.

*/


//-----------------------------Imports----------------------------------
var globals = require('../../globals.js');
import React, { Component } from 'react';
import { Alert, Image, Platform, StyleSheet, Linking, View, ScrollView, Text, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { showLoadingScreen } from '../../utils.js';
var validator = require('card-validator');


//-----------------------------Component---------------------------------
export default class Donate extends React.Component {
  //------------------navigationOptions------------------
  static navigationOptions = function(props) {
    return {
      headerStyle: Object.assign({position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }, globals.styles.header, {backgroundColor: 'transparent'}),
        title: 'Donate',
        headerTitleStyle: Object.assign(globals.styles.headerTitle),
        drawerLabel: 'Donate',
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
        total: '0',
        cardValid: false,
        cardName: '',
        cardNumber: '',
        cardCVC: '',
        cardExpiryMonth: '',
        cardExpiryYear: '',
      };
   }

//-----------------------Methods-------------------------

  componentWillMount(){
  }

  componentDidMount() {
    this.refs.creditCardInput.focus();
    this.setState({total: '0'});
  }

  _onChange(form){
    this.setState({cardValid: form.valid});
    if(form.valid){
      var cardExpiry = form.values.expiry.split('/');
      this.setState({
        cardCVC: form.values.cvc,
        cardNumber: form.values.number,
        cardExpiryMonth: cardExpiry[0],
        cardExpiryYear: cardExpiry[1]
      })
    }
  }


  async enterButtonPressed(){

    //If the details aren't valid, prompt the user to fix them
    if(!this.state.cardValid){
      alert('Please enter a valid card number.');
      return false;
    }

    Keyboard.dismiss();
    this.setLoading(true);

    //Create body for stripe POST
    var stripe_request_body = {
      card: {
          name: this.state.cardName,
          number: this.state.cardNumber.replace(/\s/g,''),
          exp_month: this.state.cardExpiryMonth,
          exp_year: this.state.cardExpiryYear,
          cvc: this.state.cardCVC
      }
    }

    //Make POST to Stripe
    var response = fetch(globals.stripe_endpoint + 'tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + globals.stripe_key
      },
      body: formurlencoded(stripe_request_body)
    })
    //TODO This should check the status code of the response
    .then((response)=>{response.json()})
    .then((response) => {})
    .catch((e) => {alert(e)});
  }

  setLoading(status){
    this.setState({loading: status});
  }

//---------------------Rendering-----------------------
  render() {
  	return(
       <ScrollView style={styles.container}>
          <Text style={styles.donationMessage}>
            To Donate, please enter your card details.
          </Text>
             <Text style={styles.donationMessage}>
               Every donation is appreciated and goes to a good cause.
             </Text>
          <Text style={styles.cardDetailsHeader}>
            CARD DETAILS
          </Text>
          <TextInput
            placeholder="Cardholder's Name"
            keyboardType='default'
            autoCapitalize='words'
            style={[styles.textInputBox, {margin: 10}]}
            value={this.cardName}
            onChangeText={(cardName) => this.setState({cardName: cardName})}
          />
          <View style={styles.cardInputContainer}>
            <LiteCreditCardInput ref='creditCardInput' onChange={(data) => this._onChange(data)} inputStyle={styles.textInputBox} style={styles.cardInput}/>
            {this.state.cardValid === true &&
              <Ionicons color='#008744' size={25} name='md-checkmark-circle' style={styles.cardValid}/>
            }
          </View>
          {/*}
          <View>
            <Text style={styles.message}>ORDER DETAILS</Text>
            <View style={styles.orderRow}>
              <Text style={styles.orderMessageLeft}>{this.props.navigation.state.params.quantity} x {this.props.navigation.state.params.ticket_type.name} to {this.props.navigation.state.params.event.title}</Text>
              <Text style={[styles.orderMessage, {position: 'absolute', right: 10}]}>
                {this.state.symbol}
                {(this.state.price / 100).toFixed(2)}
              </Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderMessageLeft}>Total</Text>
              <Text style={[styles.orderMessage, {position: 'absolute', right: 10}]}>
                {this.state.symbol}
                {(this.state.total / 100).toFixed(2)}
              </Text>
            </View>
          </View>
          */}
          <TextInput
            placeholder="Donation Amount"
            keyboardType='numeric'
            style={[styles.textInputBox, {margin: 10}]}
            value={this.state.total}
            onChangeText={(total) => this.setState({total: total})}
          />
          <TouchableOpacity onPress={() => this.enterButtonPressed()}>
            <Text style={styles.button}>
              Complete Donation
            </Text>
          </TouchableOpacity>
          {showLoadingScreen(this.state.loading)}
      </ScrollView>
  	);
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,.95)',
      height: '100%',
      paddingTop: 80
    },
    donationMessage:{
      marginBottom: 10,
      textAlign: 'center',
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderColor: 'rgba(255,255,255,.7)',
      color: 'rgba(255,255,255,.7)',
      fontSize: 16,
    },
    cardDetailsHeader: {
      marginBottom: 10,
      textAlign: 'center',
      paddingBottom: 5,
      borderBottomWidth: 1,
      fontWeight: 'bold',
      borderColor: 'rgba(255,255,255,.7)',
      color: 'rgba(255,255,255,.7)',
      fontSize: 16,
    },
    cardValid: {
      position: 'absolute',
      left: 38,
      top: 16
    },
    backButtonIcon:{
      zIndex:1,
      backgroundColor:'transparent',
      position:'absolute',
      top:15 + Expo.Constants.statusBarHeight,
      left:15,
    },
    textInputBox: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,.5)',
      color: 'white',
      backgroundColor: 'black',
      textAlign: 'left',
    },
    button: {
      backgroundColor: 'black',
      color: 'white',
      fontSize: 18,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 10,
      textAlign: 'center',
      borderColor: 'white',
      borderWidth: 1
    },
});
