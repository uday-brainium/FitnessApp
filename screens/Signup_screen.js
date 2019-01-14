import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  ImageBackground,
  StatusBar,
  Keyboard,
  ScrollView,
  BackHandler
 } from 'react-native';
import EmailTextInput from './../components/Login/EmailTextInput';
import PwdTextInput from './../components/Login/PwdTextInput';
import FirstnameTextInput from './../components/Login/FirstnameTextInput';
import LastnameTextInput from './../components/Login/LastnameTextInput';
import PhoneTextInput from './../components/Login/PhoneTextInput';
import GenderTextInput from './../components/Login/GenderTextInput';

import HeightTextInput from './../components/Login/HeightTextInput';

import WeightTextInput from './../components/Login/WeightTextInput';

import DobTextInput from './../components/Login/DobTextInput';


import EmailPwdButton from './../components/Login/EmailPwdButton';
import FooterNavButtons from './../components/Login/FooterNavButtons';
import LoginHeaderImage from './../components/Login/LoginHeaderImage';
import NavigatorService from './../utils/navigator';
import PickerScreen   from '../components/PickerScreen';
import LoadingSpinner from './../components/Loading/LoadingSpinner';

import ErrorMessage from './../components/ErrorMessage';
import {scale, scaleModerate, scaleVertical} from './../utils/scale';


import {
  RkStyleSheet,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';

class ProfileScreen extends Component {

  constructor(props) {

    super(props)

    this.state = {
      keyboardflag: false,
      loadingState: false,
    }

  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
     this.keyboardDidShowListener.remove();
     this.keyboardDidHideListener.remove();
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    NavigatorService.reset('login_screen')
    return true;
  }


  _keyboardDidShow () {
    if ( true ) {  // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    if ( true ) {  // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  static navigationOptions = {
     header: null
  }

  // Call action if the value is changed

  onRegisterPressAndReady() {
    this.setState({ loadingState: true });
    // this.props.navigation.navigate('register_screen')
    NavigatorService.reset('register_screen');
    this.setState({ loadingState: false });
    Keyboard.dismiss();
  }

  render() {

    let keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-between';
    let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};

    console.log('Profile_Screen:Line 230: Rendering Profile screen');
    // style={{...styles.screen, ...keyboardUp_styles_content}}
    return (

      <ImageBackground  source={require('./../assets/images/how_it_work_bg.png')}  style={styles.mainContainer} >

            <View style={{ ...styles.screen}}>
                  <View style={styles.containerHeader}>
                      <LoadingSpinner parentFlag={this.state.loadingState} />
                      <LoginHeaderImage
                        keyboardflag = {this.state.keyboardflag}
                        emailPwdBtnStr = {'SignUp'}
                        headerString = {'Sign up'}
                      />
                    </View>
                    <View style={styles.containerBody}>
                    <ScrollView style={styles.root}>
                      <View >
                          <FirstnameTextInput />
                          <LastnameTextInput />
                          <GenderTextInput />
                          <View style={styles.HWrow}>
                            <HeightTextInput />
                            <WeightTextInput  />
                          </View>
                          <PhoneTextInput />
                          <DobTextInput />
                          <EmailTextInput />
                          <PwdTextInput />
                      </View>

                    </ScrollView>
                    <EmailPwdButton emailPwdBtnStr={'Sign up'} />
                    <View style={styles.containerButtonFooter}>
                        <FooterNavButtons
                          emailPwdBtnStr={'Profile Screen'}
                          onForgotPassword={''}
                          onNavString1={'Already have an account ?'}
                          onNavString2={' Sign In now'}
                          onNavPress={
                            () => {
                              NavigatorService.reset('login_screen');
                            }
                          }
                          keyboardflag={this.state.keyboardflag}
                          showEmailPwdState={true}
                        />
                        <ErrorMessage />
                    </View>
                    </View>
            </View>

      </ImageBackground>
    );
  }
}
//    flex: 1,
//    justifyContent: 'space-around',
let styles = RkStyleSheet.create(theme => ({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  screen: {
    flex: 1,
    alignSelf: 'stretch',
  }, containerHeader: {
    flex: 18,
  }, containerBody: {
    flex: 65,
  }
  , containerButtonBody: {
    flex: 17,
    justifyContent:'flex-end',
    alignItems: 'center',

  },
  HWrow:{
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },containerButtonFooter :{
    marginTop: 10
  },
  image: {
    marginVertical: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  }
}));
export default ProfileScreen;
