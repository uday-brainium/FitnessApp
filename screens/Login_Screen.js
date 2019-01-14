import React, { Component } from 'react';
import { View ,StyleSheet, Text, StatusBar,ImageBackground, Modal, BackHandler, ToastAndroid} from 'react-native';
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
      modalVisible: false
    }
  }
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
  };


  componentDidMount() {
   // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
   // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  // handleBackPress = () => {
  //   this.setState({backPressCount: this.state.backPressCount + 1})
  //   console.log('BackpressCount',this.state.backPressCount);
  //   setTimeout(() => {
  //     this.setState({backPressCount: 0})
  //   }, 1000)
  //   if(this.state.backPressCount < 2){
  //     ToastAndroid.show('Press again to exit !', ToastAndroid.SHORT);
  //   } else {
  //     return false
  //   }
  //   this.props.navigation.goBack()
  //   return true
  // }

  render() {
       return (
         <View style={styles.mainContainer}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            // alert('Modal has been closed.');
              this.setState({modalVisible: false})
            }}> 
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,}}>
               <View style={styles.popup_screen}>
               <Text>Hello there </Text>
               </View>
                
              </View>

            </Modal>
        
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
