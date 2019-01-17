import React, { Component } from 'react';
import { View ,StyleSheet, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Login from './../components/Login/Login';
import { facebookSignin } from '../actions';
import NavigatorService from './../utils/navigator';
let ls = require('react-native-local-storage');


class Login_Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: null,
      isLogged: false,
      backPressCount: 0,
      modalVisible: true
    }
  }
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
  };



  render() {
       return (
         <View style={styles.mainContainer}>
         <Login
             headerString ='Sign in'
             emailPwdBtnStr='SignIn'
             fbBtnStr='Sign in with Facebook'
             showEmailPwdOption={true}
             onNavString1='Don’t have an Account?'
             onNavString2=' Sign up now'
             onNavPress={ () => { NavigatorService.reset('signup_screen'); } }
             onForgotPassword={ () => {  NavigatorService.reset('reset_screen'); } }
           />
       </View>

       )
    }
}

export default connect(null, {
  facebookSignin
})(Login_Screen);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: 'center',
    resizeMode: 'cover' ,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop:150,
    alignItems: 'center',
  }

});
