import React, { Component } from 'react';
import { View ,StyleSheet} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';

import {
  Form,Item,Label ,Input,Button,Text} from "native-base";
import { connect } from 'react-redux';
import validator from 'validator';
import { emailChanged } from './../../actions';

class EmailTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        emailError: '',
        emailFlag: 0,
      }
      // need to comment after testing
      //this.onEmailChange('test@gmai.com');
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.email != '') {
        this.validateInput('email', this.props.email);
      }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'email') {
      if (validator.isEmail(inputVal)){
        this.setState({ emailError: '' });
        this.setState({ emailFlag: 1 });
        return true;
      } else {
        this.setState({ emailError: 'Please enter a valid email address'});
        this.setState({ emailFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {
    if (inputName == 'email') {
      if (this.state.emailError !='') {
        return (<RkText rkType='danger'>{this.state.emailError}</RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>        
              <Label>Email</Label>
              <Input style = {styles.inputStyle} 
                 keyboardType="email-address"
                 autoCorrect={false}
                 autoCapitalize="none" 
                 placeholder='Email Address (john.doe@3co.com)'
                 value={this.props.email}
                 onChangeText={email => this.onEmailChange(email)}
                 onBlur={() => { this.validateInput('email', this.props.email); }} />           

        <View>
        { this.renderFormError('email') }
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
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
});


const mapStateToProps = ({ auth }) => { 
  const { email } = auth; 
  return { email };
};

export default connect(mapStateToProps, {
  emailChanged
})(EmailTextInput);
