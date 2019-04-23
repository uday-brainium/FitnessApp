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
import { passwordChanged } from './../../actions';

class PwdTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        passwordError: '',
        passwordFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.password != '') {
        this.validateInput('password', this.props.password);
      }
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
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

    if (inputName == 'password') {
      if (this.state.passwordError !='') {
        return (<RkText style={{fontSize: 16, marginHorizontal: -5}} rkType='danger'>{this.state.passwordError}</RkText>);
      }
    }
  }

  render() {
    return (
    <View>
      <View style = {styles.emailPwdContainer}>
       
              <Label style = {styles.PwdContainer}>Password</Label>
              <Input style = {styles.inputStyle} 
                 autoCorrect={false}
                 autoCapitalize="none"               
                 secureTextEntry={true}
                 value={this.props.password}
                 onChangeText={password => this.onPasswordChange(password)}
                 onBlur={() => { this.validateInput('password', this.props.password); }} />
           
      </View>

        <View style={{marginHorizontal: 20}}>
        { this.renderFormError('password') }
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
  const { password } = auth;
  return { password };
};

export default connect(mapStateToProps, {
  passwordChanged
})(PwdTextInput);
