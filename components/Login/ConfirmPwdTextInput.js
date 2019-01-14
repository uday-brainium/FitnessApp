import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Form,Item,Label ,Input,Button,Text} from "native-base";
import {
  RkText,
  RkTextInput, 
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { confirmPasswordChanged } from './../../actions';

class ConfirmPwdTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        passwordError: '',
        passwordFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.confirmPassword != '') {
        this.validateInput('confirmPassword', this.props.confirmPassword);
      }
  }

  onPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'confirmPassword') {
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
        return true;
      } else {
        this.setState({ passwordError: 'Please enter a valid password'});
        this.setState({ passwordFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'confirmPassword') {
      if (this.state.passwordError !='') {
        return (<RkText rkType='danger'>{this.state.passwordError}</RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>


              <Label style = {styles.PwdContainer}>Confirm Password</Label>
              <Input style = {styles.inputStyle} 
                 autoCorrect={false}
                 autoCapitalize="none"
                 secureTextEntry={true}
                 value={this.props.confirmPassword}
                 onChangeText={confirmPassword => this.onPasswordChange(confirmPassword)}
                 onBlur={() => { this.validateInput('confirmPassword', this.props.confirmPassword); }} />



        {/* <RkTextInput
          rkType='rounded'
          placeholder='confirm Password'
          secureTextEntry={true}
          value={this.props.confirmPassword}
          onChangeText={confirmPassword => this.onPasswordChange(confirmPassword)}
          onBlur={() => { this.validateInput('confirmPassword', this.props.confirmPassword); }}
        /> */}
        <View>
        { this.renderFormError('confirmPassword') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {   
    marginHorizontal: 20,
    marginTop: 20,     
    height:70
  },
  inputStyle: {
    flex:1, 
    alignSelf: "stretch",
    borderColor:'gray',
    borderBottomWidth:1,
    borderBottomWidth:1 ,
    height:40 ,

  }
})); 


const mapStateToProps = ({ auth }) => {
  const { confirmPassword } = auth;
  return { confirmPassword };
};

export default connect(mapStateToProps, {
  confirmPasswordChanged
})(ConfirmPwdTextInput);
