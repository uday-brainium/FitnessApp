import React, { Component } from 'react';
import { View  } from 'react-native';
//,NetInfo
import { connect } from 'react-redux';
import {
  RkStyleSheet,RkButton
} from 'react-native-ui-kitten';
import validator from 'validator';
import { loginUser, signupUser,changeUserPassword,errorSet, resetUser } from './../../actions';
let ls = require('react-native-local-storage');


class EmailPwdButton extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    ls.get('userdata').then((data) => {
      this.setState({user: JSON.parse(data)})
    })
  }

  onButtonPress() {

    if (this.props.emailPwdBtnStr == 'Sign in') {

        const { email, password } = this.props;
        if ( this.validateInput('email', email) && this.validateInput('password', password)) {
            if(this.props.remember) {
              let credentials = {email, password}
              ls.save('remember', JSON.stringify(credentials))
            }
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
      
        const { emailReset } = this.props;
        if ( this.validateInput('email', emailReset) ) {
          const user_is='1234567890';
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

            if(this.state.user == null || this.state.user == "")
            {
             this.props.errorSet('Something went wrong in change password .');
            }else {

              const user_id = (typeof this.state.user._id !== "undefined") ? this.state.user._id : 0;
              console.log('Hello-world', user_id);
              
              this.props.changeUserPassword({ user_id, oldPassword, newPassword});

            }

          }else
          this.props.errorSet('New and Confirm password should be same.');
         // this.props.onButtonPress();
        } else {
          this.props.errorSet('Please provide valid inputs password');
        }
    } else {
      
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
                  onPress={() => { this.onButtonPress() }}
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
