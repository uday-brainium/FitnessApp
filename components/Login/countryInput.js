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
import { countryChange } from '../../actions/AuthActions';

class CountryInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        countryErr: '',
        countryFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.country != '') {
        this.validateInput('country', this.props.country);
      }
  }

  onFirstnameChange(text) {
    console.log('prop', this.props);
    
    this.props.countryChange(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'country') {
      if (validator.isAscii(inputVal)){
        this.setState({ countryErr: '' });
        this.setState({ countryFlag: 1 });
        return true;
      } else {
        this.setState({ countryErr: 'Please enter your country'});
        this.setState({ countryFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'country') {
      if (this.state.countryErr !='') {
        return (<RkText rkType='danger' style={{fontSize: 16, marginHorizontal: -5}}> {this.state.countryErr} </RkText>);
      }
    }
  }

  render() {

    return (
         <View style = {styles.emailPwdContainer}>          
              <Label>Country</Label>
              <Input style = {styles.inputStyle} 
                 autoCorrect={false}
                 autoCapitalize="none" 
                 value={this.props.country}
                 onChangeText={firstname => this.onFirstnameChange(firstname)}
                 onBlur={() => { this.validateInput('country', this.props.country); }} />
           
        <View>
        { this.renderFormError('country') }
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
  return { country: auth.country };
};

export default connect(mapStateToProps, {
  countryChange
})(CountryInput);
