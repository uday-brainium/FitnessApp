import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import NavigatorService from './../utils/navigator';
let ls = require('react-native-local-storage');


export default class Splash_screen extends Component {
 constructor(props){
   super(props)
   this.state = {
     isOpened: false,
     isLogged: false
   }
 }

 static navigationOptions = {
   header: null,
 };

 componentDidMount() {
   ls.get('isOpened').then((data) => {
     const isOpened = data == 'opened' ? true : false
     this.setState({isOpened})
   })
   ls.get('userdata').then((data) => {
     const isLogged = data != null ? true : false
     this.setState({isLogged})
     console.log('USERDATA ONLOGIN', data);
   })

   setTimeout(() => {
     if(this.state.isOpened) {
       NavigatorService.reset('login_screen');
       if(this.state.isLogged){
         NavigatorService.reset('dashboard_screen');
       }
     } else {
       NavigatorService.reset('welcome_screen');
     }
   }, 3000)
 }


  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.splash_image} source={require('./../assets/images/splash.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height
    },
  splash_image: {
    width: 250,
    height: 270
  }
});
