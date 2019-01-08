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
import { oldPasswordChanged } from './../../actions';

class OldPwdTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        passwordError: '',
        passwordFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.oldPassword != '') {
        this.validateInput('password', this.props.password);
      }
  }

  onPasswordChange(text) {
    this.props.oldPasswordChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'password') {
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

    if (inputName == 'oldPassword') {
      if (this.state.passwordError !='') {
        return (<RkText rkType='danger'>{this.state.passwordError}</RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>

              <Label style = {styles.PwdContainer}>Old Password</Label>
              <Input style = {styles.inputStyle} 
                 autoCorrect={false}
                 autoCapitalize="none"
                 secureTextEntry={true}
                 value={this.props.oldPassword}
                onChangeText={oldPassword => this.onPasswordChange(oldPassword)}
                 onBlur={() => { this.validateInput('oldPassword', this.props.oldPassword); }} />


        {/* <RkTextInput
          rkType='rounded'
          placeholder='oldPassword'
          secureTextEntry={true}
          value={this.props.oldPassword}
          onChangeText={oldPassword => this.onPasswordChange(oldPassword)}
          onBlur={() => { this.validateInput('password', this.props.oldPassword); }}
        /> */}
        <View>
        { this.renderFormError('oldPassword') }
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
  const { oldPassword } = auth;
  return { oldPassword };
};

export default connect(mapStateToProps, {
  oldPasswordChanged
})(OldPwdTextInput);
