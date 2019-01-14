import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  ImageBackground,
  Keyboard,
  StatusBar,
  Platform,
  BackHandler
 } from 'react-native';

import { connect } from 'react-redux';
import { emailResetChanged, errorSet, resetUser } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import EmailResetTextInput from './../components/Login/EmailResetTextInput';
import LoginHeaderImage from './../components/Login/LoginHeaderImage';
import EmailPwdButton from './../components/Login/EmailPwdButton';
import FooterNavButtons from './../components/Login/FooterNavButtons';

import LoadingSpinner from './../components/Loading/LoadingSpinner';
import ErrorMessage from './../components/ErrorMessage';

import {scale, scaleModerate, scaleVertical} from './../utils/scale';
import NavigatorService from './../utils/navigator';

import { RkStyleSheet } from 'react-native-ui-kitten';


class Reset_Screen extends Component {

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

  onReset() {
    NavigatorService.reset('login_screen');
    Keyboard.dismiss();
  }


  renderSpinner() {
    if (this.state.loadingState) {
      return (
          <Spinner visible={true} color={'#FFF'} size={'large'} />
      );
    }
  }

  render() {
    let keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-between';
    let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};

    return (
      <ImageBackground  source={require('./../assets/images/how_it_work_bg.png')}  style={styles.mainContainer} >
          <View style={styles.screen}>
                <LoadingSpinner />
                <ErrorMessage />
              <View style={styles.containerHeader}>
                <LoginHeaderImage
                  keyboardflag = {this.state.keyboardflag}
                  emailPwdBtnStr = {'Reset'}
                  headerString = {'Password Reset'}
                />
              </View>
              <View  style={styles.containerBody}>
                <EmailResetTextInput />
              </View>
              <View style={{ ...styles.containerButtonBody, ...keyboardUp_styles_content }}>
                <EmailPwdButton
                  emailPwdBtnStr={'Reset'}
                  onButtonPress={this.onReset.bind(this)}
                />
                <FooterNavButtons
                  emailPwdBtnStr={'Profile Screen'}
                  onForgotPassword={''}
                  onNavString1={'Already have an account?'}
                  onNavString2={'Sign in now'}
                  onNavPress={() => NavigatorService.reset('login_screen')}
                  keyboardflag={this.state.keyboardflag}
                  showEmailPwdState={true}
                />
              </View>
           </View>
      </ImageBackground>
    );
  }
}


let styles = RkStyleSheet.create(theme => ({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "center",
    alignItems: 'center',
    resizeMode: 'cover'
  },
  screen: {
    flex: 1,
    alignSelf: 'stretch',
  }, containerHeader: {
    flex: 25,
  }, containerBody: {
    flex: 25,
    marginTop:25
  }
  , containerButtonBody: {
    flex: 50,
    marginBottom:10,
  }
  ,
  buttonStyle: {
    justifyContent: 'flex-end'
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'flex-start',
    marginTop: 20
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));

const mapStateToProps = ({ auth }) => {
  const { emailReset } = auth;
  return { emailReset };
};

export default connect(mapStateToProps, {
  emailResetChanged, resetUser, errorSet
})(Reset_Screen);
