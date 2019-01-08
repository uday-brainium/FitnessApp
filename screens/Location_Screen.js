import React, { Component } from 'react';
import { View ,StyleSheet,StatusBar,ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import Login from './../components/Login/Login';
import { facebookSignin } from '../actions';
import NavigatorService from './../utils/navigator';


class Login_Screen extends Component {

  static navigationOptions = {
    header: null, 
  };

  render() {
    console.log('Login_Screen:Line 15: Rendering Login_Screen');
      return (

        <ImageBackground  source={require('./../assets/images/how_it_work_bg.png')}  style={styles.mainContainer} >
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true} />
        <Login
            headerString ='Sign in'
            emailPwdBtnStr='SignIn'
            fbBtnStr='Sign in with Facebook'
            showEmailPwdOption={true}
            onNavString1='Don’t have an Account?'
            onNavString2=' Sign up Now'
            onNavPress={ () => { NavigatorService.reset('profile_screen'); } }
            onForgotPassword={ () => {  NavigatorService.reset('reset_screen'); } }
          />
      </ImageBackground>          
      )
  }
}

export default connect(null, {
  facebookSignin
})(Login_Screen);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    resizeMode: 'cover'    
  },
  container: {   
    flex: 1, 
    justifyContent: "flex-start",
    paddingTop:150,
    alignItems: 'center',    
  }
});
