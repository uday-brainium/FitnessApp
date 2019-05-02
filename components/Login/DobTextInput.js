import React, { Component } from 'react';
import { View } from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { Container, Header, Content, DatePicker, Text } from 'native-base';

import { connect } from 'react-redux';
import validator from 'validator';
import { dobChanged } from './../../actions';
//var moment = require('moment')['default'];
import moment from 'moment'
class DobTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }


  onDobChanged(text) {
    this.props.dobChanged(text);
  }



  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'dob') {
      if (this.state.dobError !='') {
        return (<RkText rkType='danger'> {this.state.dobError} </RkText>);
      }
    }
  }

  render() {
    console.log('props', this.props);
    
    let tomorrow = new Date();
    // format the current date    
    var now= moment(tomorrow).subtract(5, 'year').format('YYYY-MM-DD')
     var previous= moment(tomorrow).subtract(105, 'year').format('YYYY-MM-DD')

    return (
      <View style = {styles.emailPwdContainer}>
            <Text style={{color: 'gray'}}>Date of birth</Text>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(previous)}
              maximumDate={new Date(now)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date of birth"
              textStyle={{ color: "black", fontSize: 17, marginLeft: -10 }}
              placeHolderTextStyle={{ color: "gray", fontSize: 17, marginLeft: -10 }}
              onDateChange={this.onDobChanged}
            />
            

        <View style={{marginTop: -20}}>
        { this.renderFormError('dob') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: "stretch",
    borderColor:'gray',
    borderBottomWidth:1,
    //borderBottomWidth:1  
  }
}));


const mapStateToProps = ({ auth }) => {
  const { dob } = auth;
  return { dob };
};

export default connect(mapStateToProps, {
  dobChanged
})(DobTextInput);
