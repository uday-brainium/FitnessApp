import React, { Component } from 'react';
import { View,ToastAndroid } from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { passwordChanged, oldPasswordChanged,newPasswordChanged,confirmPasswordChanged } from './../../actions';

class OldPwdTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        passwordError: '',
        passwordFlag: 0,
      }
      // need to comment after testing
      //this.onPasswordChange('1111');
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.password != '') {
        {ToastAndroid.show('componentWillMount this.props.password ==> '+this.props.password, ToastAndroid.SHORT)}
        {ToastAndroid.show('componentWillMount this.props.PwdTextInputType ==> '+this.props.PwdTextInputType, ToastAndroid.SHORT)}
        switch(this.props.PwdTextInputType) {     
          case 'password': 
          this.validateInput('password', this.props.password); break;     
          case 'oldPassword':
          this.validateInput('oldPassword', this.props.password); break;
          case 'newPassword':
          this.validateInput('newPassword', this.props.password); break;
          case 'confirmPassword':
          this.validateInput('confirmPassword', this.props.password); break;
           default:
           this.validateInput('password', this.props.password); break; 
            //return 'foo';
         }
      }
  }

  onPasswordChange(text) {
    switch(this.props.PwdTextInputType) {     
      case 'password':
      return this.props.passwordChanged(text);      
      case 'oldPassword':
      return this.props.oldPasswordChanged(text); 
      case 'newPassword':
      return this.props.newPasswordChanged(text); 
      case 'confirmPassword':
      return this.props.confirmPasswordChanged(text);
        //return 'foo';
     }
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    switch(inputName) {     
      case 'password':
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid password'});
        this.setState({ passwordFlag: 0 });
      }
      break;
      case 'oldPassword':
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid Old Password'});
        this.setState({ passwordFlag: 0 });       
      }
      break;
      case 'newPassword':
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid New Password'});
        this.setState({ passwordFlag: 0 });       
      }
      break;
      case 'confirmPassword':
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid Confirm Password'});
        this.setState({ passwordFlag: 0 });       
      }
      break;
       default:
       if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid  Password'});
        this.setState({ passwordFlag: 0 });       
      } 
        //return 'foo';
     }

    // if (inputName == 'password') {
    //   if (validator.isAscii(inputVal)){
    //     this.setState({ passwordError: '' });
    //     this.setState({ passwordFlag: 1 });
    //     return true;
    //   } else {
    //     this.setState({ passwordError: 'Please enter a valid password'});
    //     this.setState({ passwordFlag: 0 });
    //     return false;
    //   }
    // }
  }
  // Display form validation errors if needed
  renderFormError(inputName) {

    //if (inputName == 'password') 
    {
      if (this.state.passwordError !='') {
        return (<RkText rkType='danger'>{this.state.passwordError}</RkText>);
      }
    }
  }
  //secureTextEntry={true}
  render() {
    return (
      <View style = {styles.emailPwdContainer}>
        <RkTextInput
          rkType='rounded'
          placeholder='Password'         
          value={this.props.password}
          onChangeText={password => this.onPasswordChange(password)}          
        />
        <View>
        { this.renderFormError('password') }
        </View>
      </View>
    );
  }
}
//onBlur={() => { this.validateInput(this.props.PwdTextInputType, this.props.password); }}
let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {
    alignItems: 'center',
    marginHorizontal: 20
  }
}));

const mapStateToProps = ({ auth }) => {
  const { password,oldPassword,newPassword,confirmPassword } = auth;
  return { password,oldPassword,newPassword,confirmPassword };
};

export default connect(mapStateToProps, {
  passwordChanged,oldPasswordChanged,newPasswordChanged,confirmPasswordChanged
})(OldPwdTextInput);
