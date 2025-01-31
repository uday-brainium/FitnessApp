import React, { Component } from 'react';
import { View } from 'react-native';
import { Item,Label ,Input} from "native-base";
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { firstnameChanged } from './../../actions';

class FirstnameTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        firstnameError: '',
        firstnameFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.firstname != '') {
        this.validateInput('firstname', this.props.firstname);
      }
  }

  onFirstnameChange(text) {
    this.props.firstnameChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'firstname') {
      if (validator.isAscii(inputVal)){
        this.setState({ firstnameError: '' });
        this.setState({ firstnameFlag: 1 });
        return true;
      } else {
        this.setState({ firstnameError: 'Please enter your First Name'});
        this.setState({ firstnameFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'firstname') {
      if (this.state.firstnameError !='') {
        return (<RkText rkType='danger' style={{fontSize: 16, marginHorizontal: -5}}> {this.state.firstnameError} </RkText>);
      }
    }
  }

  render() {
    return (
         <View style = {styles.emailPwdContainer}>          
              <Label>First Name</Label>
              <Input style = {styles.inputStyle} 
                 autoCorrect={false}
                 autoCapitalize="none" 
                 value={this.props.firstname}
                 onChangeText={firstname => this.onFirstnameChange(firstname)}
                 onBlur={() => { this.validateInput('firstname', this.props.firstname); }} />
           
        <View>
        { this.renderFormError('firstname') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {   
    marginHorizontal: 20,
    marginTop: 20,   
  },
  inputStyle: {
    flex:1, 
    alignSelf: "stretch",
    borderColor:'gray',
    borderBottomWidth:1,
    borderBottomWidth:1   
  }
}));


const mapStateToProps = ({ auth }) => {
  const { firstname } = auth;
  return { firstname };
};

export default connect(mapStateToProps, {
  firstnameChanged
})(FirstnameTextInput);
