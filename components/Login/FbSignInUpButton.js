import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { scaleModerate, scaleVertical } from './../../utils/scale';

import { connect } from 'react-redux';

import {
  RkButton,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {FontAwesome} from './../../assets/icons';
import {GradientButton} from './../../components/';
import { facebookSignin, facebookSignup } from './../../actions';
import {scale} from './../../utils/scale';

class FbSignInUpButton extends Component {

  _pressSignInUp() {
    if (this.props.emailPwdBtnStr == 'SignIn') {
        this.props.facebookSignin();
    } else {
      const { email, phone, firstname, lastname } = this.props;
      this.props.facebookSignup({ email, phone, firstname, lastname });
    }
  }

  render() {
    return (
      <View >        
        <RkButton
          onPress={() => { this._pressSignInUp(); }}         
          rkType='stretch'  
          style={[styles.button, styles.text]}
         >
         {this.props.fbBtnStr}
        </RkButton>
      </View>

    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, phone, firstname, lastname, loginStatus, } = auth;
  return { email, phone, firstname, lastname, loginStatus, };
};


let styles = RkStyleSheet.create(theme => ({
  save: {
    
    marginHorizontal: 16,  
  }, 
  button: {
    marginHorizontal: 16,
  },
  text: {    
    color: theme.colors.screen.base,
  }
}));


export default connect(mapStateToProps, {
  facebookSignin, facebookSignup
})(FbSignInUpButton);
