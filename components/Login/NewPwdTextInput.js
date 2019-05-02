import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  Form,Item,Label ,Input,Button} from "native-base";
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { newPasswordChanged } from './../../actions';

class NewPwdTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        passwordError: '',
        passwordFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.newPassword != '') {
        this.validateInput('newPassword', this.props.newPassword);
      }
  }

  onPasswordChange(text) {
    this.props.newPasswordChanged(text);
   
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'newPassword') {
      if (validator.isAscii(inputVal)){

        if(inputVal.length > 5) {
          this.setState({ passwordFlag: 1 });
          return true;
        } else {  
          this.setState({ passwordError: 'Password must be at least 6 character !' });
          this.setState({ passwordFlag: 0 });
          return false
        }
        
      } else {
        this.setState({ passwordError: 'Please enter a valid password'});
        this.setState({ passwordFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'newPassword') {
      if (this.state.passwordError !='') {
        return (<Text style={{fontSize: 16, color: 'red', marginHorizontal: 15}}>{this.state.passwordError}</Text>);
      }
    }
  }

  render() {
    return (
      <View>
      <View style = {styles.emailPwdContainer}>
        <Label style = {styles.PwdContainer}>New Password</Label>
        <Input style = {styles.inputStyle} 
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.props.newPassword}
          onChangeText={newPassword => this.onPasswordChange(newPassword)}
            onBlur={() => { this.validateInput('newPassword', this.props.newPassword); }} />



        {/* <RkTextInput
          rkType='rounded'
          placeholder='newPassword'
          secureTextEntry={true}
          value={this.props.newPassword}
          onChangeText={newPassword => this.onPasswordChange(newPassword)}
          onBlur={() => { this.validateInput('newPassword', this.props.newPassword); }}
        /> */}
        
        
      </View>
        { this.renderFormError('newPassword') }
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
   // flex:1, 
    alignSelf: "stretch",
    borderColor:'gray',
    borderBottomWidth:1,
    borderBottomWidth:1 ,
    height:40 ,

  }
}));  


const mapStateToProps = ({ auth }) => {
  const { newPassword } = auth;
  return { newPassword };
};

export default connect(mapStateToProps, {
  newPasswordChanged
})(NewPwdTextInput);
