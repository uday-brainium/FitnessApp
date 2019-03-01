import React, { Component } from "react";
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  ImageBackground,
  Dimensions,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal
} from "react-native";
import { connect } from "react-redux";
import {fb_login_action} from './../../actions/fbLogin_action'
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import { CheckBox } from 'react-native-elements'
import ErrorMessage from "./../ErrorMessage";
import LoginHeaderImage from "./LoginHeaderImage";
import LoginORBar from "./LoginORBar";
import EmailTextInput from "./EmailTextInput";
import PwdTextInput from "./PwdTextInput";
import FbSignInUpButton from "./FbSignInUpButton";
import EmailPwdButton from "./EmailPwdButton";
import FooterNavButtons from "./FooterNavButtons";
import LoadingSpinner from "./../Loading/LoadingSpinner";
import  FBLoginView from './../FBLoginView'
let ls = require('react-native-local-storage');

import { RkStyleSheet } from "react-native-ui-kitten";
import {
  Container,
  Content,
} from "native-base";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardflag: false,
      showEmailPwdState: false,
      user: {},
      isLoading: false,
      rememberCheck: false,
    };
  }

  componentWillMount() {
    // set listeners on when the keyboard is up or down
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );

  //   <FbSignInUpButton
  //   emailPwdBtnStr={this.props.emailPwdBtnStr}
  //   fbBtnStr={this.props.fbBtnStr}
  // />
  }

  componentWillUnmount() {
    // remove the listeners upon exit
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    ls.get('remember').then((data) => {
      if(JSON.parse(data) != null){
        this.setState({rememberCheck: true})
      }
    })
  }

  _keyboardDidShow() {
    // use the spring animation when the key board is shown
    if (true) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide() {
    // use the spring animation when the key board is hidden
    if (true) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  _renderEmailPwdOption() {
    if (
      this.props.emailPwdBtnStr === "SignIn" ||
      this.state.showEmailPwdState
    ) {
      // In the case of login screen or if the email pwd button is pressed
      return (
        <View>
          <EmailTextInput />
          <PwdTextInput />
        </View>
      );
    }
  }

  _renderEmailPwdBTNOption() {
    if (
      this.props.emailPwdBtnStr === "SignIn" ||
      this.state.showEmailPwdState
    ) {
      // In the case of login screen or if the email pwd button is pressed
      return (
        <View>
          <EmailPwdButton emailPwdBtnStr={"Sign in"} remember={this.state.rememberCheck} />
        </View>
      );
    }
  }

  pressEmailPwdButton() {
    this.setState({ showEmailPwdState: true });
  }

  fbLogin_action = (e) => {
    this.setState({isLoading: true})
    this.props.fb_login_action(e)
  }

  render() {
    let height = Dimensions.get("window").height;
    let width = Dimensions.get("window").width;
    let bodyContainer = height;
    let height_sub = height * 0.33;
    let imagePadding = height * 0.15;
    let width_sub = width - 40;
    return (
      <View style={styles.content}>
        <View>
          <ImageBackground
            source={require("./../../assets/images/how_it_work_bg.png")}
            style={{ width: width, height: bodyContainer }}
          >
            <View style={{ width: width, height: bodyContainer }}>
              <View style={styles.containerSignInHeader}>
               {this.state.isLoading && (
                  <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.isLoading}
                  onRequestClose={() => {
                    this.setState({isLoading: true})
                  }}> 
                    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
                     <View style={styles.popup_screen}>
                      <View style={{justifyContent: 'center'}}>
                         <ActivityIndicator size="large" color="#0000ff" />
                       </View> 
                     </View>
                     </View>
                  </Modal>
                  // <View style={{justifyContent: 'center', marginTop: '45%'}}>
                  //   <ActivityIndicator size="large" color="#0000ff" />
                  // </View> 
                )}
                <LoginHeaderImage
                  keyboardflag={this.state.keyboardflag}
                  emailPwdBtnStr={this.props.emailPwdBtnStr}
                  headerString={this.props.headerString}
                />
              </View>
              
              <View style={styles.containerSignInBody}>
                {this._renderEmailPwdOption()}
              </View>
              <View style={{marginBottom: -20}}>
              <CheckBox
                title='Remember me'
                checked={this.state.rememberCheck}
                containerStyle={{backgroundColor: 'transparent', marginTop: 5}}
                onPress={() => this.setState({rememberCheck: !this.state.rememberCheck})}
              />
              </View>
              <View style={styles.containerSignInButtonBody}>
                <View>{this._renderEmailPwdBTNOption()}</View>

                <LoginORBar />
                <View>
                   <FBLogin
                      buttonView={<FBLoginView />}
                      ref={(fbLogin) => { this.fbLogin = fbLogin }}
                      loginBehavior={FBLoginManager.LoginBehaviors.Native}
                      permissions={["public_profile","email"]}
                      onLogin={this.fbLogin_action}
                      onLoginFound={function(e){console.log(e)}}
                      onLoginNotFound={function(e){console.log(e)}}
                      onLogout={function(e){console.log(e)}}
                      onCancel={function(e){console.log(e)}}
                      onPermissionsMissing={function(e){console.log(e)}}
                    />
                </View>
                <View style={styles.containerSignInFooter}>
                  <FooterNavButtons
                    emailPwdBtnStr={this.props.emailPwdBtnStr}
                    _footerButton={this.props._footerButton}
                    onForgotPassword={this.props.onForgotPassword}
                    onNavString1={this.props.onNavString1}
                    onNavString2={this.props.onNavString2}
                    onNavPress={this.props.onNavPress}
                    keyboardflag={this.state.keyboardflag}
                    pressEmailPwdButton={this.pressEmailPwdButton.bind(this)}
                    showEmailPwdState={this.state.showEmailPwdState}
                  />
                </View>
                <ErrorMessage />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

//
function mapStateToProps(state){
    return {
        isLoogedIn: state,
    }
}
// const mapDispatchToProps = (dispatch) => {
//   return ({
//     fb_login_action: (e) => {dispatch(e)}
//   })
// }

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "transparent"
  },
  content: {
    backgroundColor: "transparent"
  },
  containerSignInHeader: {
    flex: 15,
    alignSelf: "stretch"
  },
  containerSignInBody: {
    flex: 30,
    alignSelf: "stretch",
    paddingTop:40
  },
  containerSignInButtonBody: {
    flex: 45,
    alignSelf: "stretch"
  },
  containerSignInFooter: {
    marginTop: 28
  },
  containerBGFTR: {
    backgroundColor: "#0000FF"
  },
  containerBGPur: {
    backgroundColor: "#8A2BE2"
  }
});

export default connect(mapStateToProps ,
  {fb_login_action}
)(Login);
