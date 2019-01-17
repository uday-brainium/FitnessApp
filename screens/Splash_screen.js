import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import NavigatorService from './../utils/navigator';
let ls = require('react-native-local-storage');


export default class Splash_screen extends Component {
 constructor(props){
   super(props)
   this.state = {
     isOpened: false,
     isLogged: false,
     splash2: false
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
   })

  setTimeout(() => {
    this.setState({splash2: true})
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
     
   }, 2000)
 }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {!this.state.splash2 &&
          <Image style={styles.splash_image} source={require('./../assets/images/splash2.png')} />
        }
        {this.state.splash2 &&
          <Image style={styles.splash2_img} source={require('./../assets/images/splash1.jpg')} />
        }
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
  },
  splash2_img: {
    width: '100%',
    height: 250
  }
});
