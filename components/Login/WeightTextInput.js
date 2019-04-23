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
import { weightChanged } from './../../actions';

class WeightTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        weightError: '',
        weightFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.weight != '') {
        this.validateInput('weight', this.props.weight);
      }
  }

  onWeightChanged(text) {
    this.props.weightChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'weight') {
      if (validator.isAscii(inputVal)){
        this.setState({ weightError: '' });
        this.setState({ weightFlag: 1 });
        return true;
      } else {
        this.setState({ weightError: 'Please enter your Weight'});
        this.setState({ weightFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'weight') {
      if (this.state.weightError !='') {
        return (<RkText rkType='danger' style={{fontSize: 16, marginHorizontal: -5}}> {this.state.weightError} </RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>

           
              <Label>Weight (kg)</Label>
              <Input style = {styles.inputStyle}
                 keyboardType="numeric"
                 autoCorrect={false}
                 autoCapitalize="none" 
                 value={this.props.weight}
                 onChangeText={weight => this.onWeightChanged(weight)}
                 onBlur={() => { this.validateInput('weight', this.props.weight); }} />
           

        {/* <RkTextInput
          rkType='rounded'
          placeholder='Weight ( 78 kgs )'
          value={this.props.weight}
          onChangeText={weight => this.onWeightChanged(weight)}
          onBlur={() => { this.validateInput('weight', this.props.weight); }}
        /> */}
        <View>
        { this.renderFormError('weight') }
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
  }
}));


const mapStateToProps = ({ auth }) => {
  const { weight } = auth;
  return { weight };
};

export default connect(mapStateToProps, {
  weightChanged
})(WeightTextInput);
