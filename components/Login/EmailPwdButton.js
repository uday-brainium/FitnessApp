import React, { Component } from 'react';
import { View  } from 'react-native';
//,NetInfo
import { connect } from 'react-redux';
import {
  RkStyleSheet,RkButton
} from 'react-native-ui-kitten';
import validator from 'validator';
import { loginUser, signupUser,changeUserPassword,errorSet, resetUser } from './../../actions';

class EmailPwdButton extends Component {

  onButtonPress() {

    if (this.props.emailPwdBtnStr == 'Sign in') {
       console.log('inside Sign in button press: '+this.props.emailPwdBtnStr);
        const { email, password } = this.props;
        if ( this.validateInput('email', email) && this.validateInput('password', password)) {

          this.props.loginUser({ email, password });
          // NetInfo.isConnected.fetch().then(isConnected => {
          //   //console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          //   if(isConnected)
          //   {

          //   }else
          //   {
          //     this.props.errorSet('Please check your internet connection.');
          //   }
          // });

        } else {
          this.props.errorSet('Please provide valid inputs');
        }
    } else if (this.props.emailPwdBtnStr == 'Sign up') {
         console.log('inside Sign up button press: '+this.props.emailPwdBtnStr);
         const {  email, password, gender, height, weight, dob, phone, firstname, lastname } = this.props;

        if ( this.validateInput('email', email) && this.validateInput('password', password)) {
          this.props.signupUser({  email, password, gender, height, weight, dob, phone, firstname, lastname });
          // NetInfo.isConnected.fetch().then(isConnected => {
          //   //console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          //   if(isConnected)
          //   {

          //   }else
          //   {
          //     this.props.errorSet('Please check your internet connection.');
          //   }
          // });

        } else {
          this.props.errorSet('Please provide valid inputs');
        }
    } else if (this.props.emailPwdBtnStr == 'Reset') {
      console.log('inside Reset button press: '+this.props.emailPwdBtnStr);

      console.log('EmailPwdButton Press for Reset');
        const { emailReset } = this.props;
        console.log('EmailPwdButton Press for Reset email=> '+emailReset);
        if ( this.validateInput('email', emailReset) ) {
          const user_is='1234567890';
          console.log('sarwesh emailReset==> '+emailReset)
          this.props.resetUser({emailReset,user_is});
         // this.props.onButtonPress();

          // NetInfo.isConnected.fetch().then(isConnected => {
          //   //console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          //   if(isConnected)
          //   {
          //     const user_is='1234567890';
          //     this.props.resetUser({emailReset,user_is});
          //     this.props.onButtonPress();
          //   }else
          //   {
          //     this.props.errorSet('Please check your internet connection.');
          //   }
          // });
        } else {
          this.props.errorSet('Please provide valid inputs');
        }
    } else  if (this.props.emailPwdBtnStr === 'Change') {
         const { oldPassword,newPassword, confirmPassword} = this.props;
        if ( this.validateInput('password', oldPassword) && this.validateInput('password', newPassword)
        && this.validateInput('password', confirmPassword))
         {
          if ( newPassword === confirmPassword)
          {

            if(this.props.user==null)
            {
             this.props.errorSet('Something went wrong in change password .');
            }else {

              const { profile_details} = this.props.user;
              const user_id=profile_details.user_id;
              this.props.changeUserPassword({user_id,oldPassword,newPassword});

            }

          }else
          this.props.errorSet('New and Confirm password should be same.');
         // this.props.onButtonPress();
        } else {
          this.props.errorSet('Please provide valid inputs password');
        }
    } else {
      console.log('inside Change no button press matched '+this.props.emailPwdBtnStr);
    }
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {
    switch(inputName) {
        case 'password':
        return validator.isAscii(inputVal);
        case 'email':
        return validator.isEmail(inputVal);
      // default:
      //   return 'foo';
    }
  }

  render () {
    return (
      <View  >
        <RkButton
                  onPress={() => {console.log("Hello"); this.onButtonPress() }}
                  rkType='stretch'
                  style={[styles.button, styles.text]}
        >
                  {this.props.emailPwdBtnStr}
        </RkButton>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    backgroundColor: theme.colors.green,
  },
  text: {
    color: theme.colors.screen.base,
  }
}));

const mapStateToProps = ({ auth }) => {
  const {emailReset, email, password,oldPassword,newPassword,confirmPassword, gender, height, weight, dob,phone, firstname, lastname,user } = auth;

  return { emailReset,email, password,oldPassword,newPassword,confirmPassword, gender, height, weight, dob, phone, firstname, lastname,user };
};

export default connect(mapStateToProps, {
  loginUser, signupUser,changeUserPassword, errorSet, resetUser
})(EmailPwdButton);
