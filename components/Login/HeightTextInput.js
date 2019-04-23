import React, { Component } from 'react';
import { View } from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { Item,Label ,Input} from "native-base";
import { connect } from 'react-redux';
import validator from 'validator';
import { heightChanged } from './../../actions';

class HeightTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        heightError: '',
        heightFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.height != '') {
        this.validateInput('height', this.props.height);
      }
  }

  onHeightChanged(text) {
    this.props.heightChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'height') {
      if (validator.isAscii(inputVal)){
        this.setState({ heightError: '' });
        this.setState({ heightFlag: 1 });
        return true;
      } else {
        this.setState({ heightError: 'Please enter your Height'});
        this.setState({ heightFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {
    if (inputName == 'height') {
      if (this.state.heightError !='') {
        return (<RkText rkType='danger' style={{fontSize: 16, marginHorizontal: -5}}> {this.state.heightError} </RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>
              <Label>Height (cm)</Label>
              <Input style = {styles.inputStyle}
                 keyboardType="numeric"
                 autoCorrect={false}
                 autoCapitalize="none" 
                 value={this.props.height}
                 onChangeText={height => this.onHeightChanged(height)}
                 onBlur={() => { this.validateInput('height', this.props.height); }} />
          

        {/* <RkTextInput
          rkType='rounded'
          placeholder='Height ( 175 inch )'
          value={this.props.height}
          onChangeText={height => this.onHeightChanged(height)}
          onBlur={() => { this.validateInput('height', this.props.height); }}
        /> */}
        <View>
        { this.renderFormError('height') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {
    flex:1,
    alignSelf: 'stretch',   
    marginHorizontal: 20,
    marginTop: 20, 
  },
  inputStyle: {
    flex:1, 
    alignSelf: "stretch",
    borderColor:'gray',
    borderBottomWidth:1,
    borderBottomWidth:1   
  },
   btnStrech:{
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: "#0000FF" 
  },
}));


const mapStateToProps = ({ auth }) => {
  const { height } = auth;
  return { height };
};

export default connect(mapStateToProps, {
  heightChanged
})(HeightTextInput);
