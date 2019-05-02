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
import { cityChange } from '../../actions/AuthActions';

class CityInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        cityErr: '',
        cityFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.city != '') {
        this.validateInput('city', this.props.city);
      }
  }

  onFirstnameChange(text) {
    console.log('prop', this.props);
    
    this.props.cityChange(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'city') {
      if (validator.isAscii(inputVal)){
        this.setState({ cityErr: '' });
        this.setState({ cityFlag: 1 });
        return true;
      } else {
        this.setState({ cityErr: 'Please enter your city'});
        this.setState({ cityFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'city') {
      if (this.state.cityErr !='') {
        return (<RkText rkType='danger' style={{fontSize: 16, marginHorizontal: -5}}> {this.state.cityErr} </RkText>);
      }
    }
  }

  render() {

    return (
         <View style = {styles.emailPwdContainer}>          
              <Label>City</Label>
              <Input style = {styles.inputStyle} 
                 autoCorrect={false}
                 autoCapitalize="none" 
                 value={this.props.city}
                 onChangeText={firstname => this.onFirstnameChange(firstname)}
                 onBlur={() => { this.validateInput('city', this.props.city); }} />
           
        <View>
        { this.renderFormError('city') }
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
  return { city: auth.city };
};

export default connect(mapStateToProps, {
  cityChange
})(CityInput);
