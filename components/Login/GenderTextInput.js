import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker, Item } from 'native-base';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { genderChanged } from './../../actions';



class GenderTextInput extends Component { 

  constructor(props) {
      super(props)
      this.state = {
        selected: "Male"
      };
  }

 
 
  onGenderChange(text) {
    console.log('onGenderChange');
    this.setState({ selected: text });
    this.props.genderChanged(text);
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'gender') {
      if (this.state.genderError !='') {
        return (<RkText rkType='danger' style={{fontSize: 16, marginHorizontal: -5}}> {this.state.genderError} </RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>
            <Text style={{fontSize: 16}}>Gender</Text>
            <Picker
              note
              mode="dropdown"
              style={{ width: '100%', height:20, marginBottom: -10, marginTop: 5, marginLeft: -5 }}
              selectedValue={this.state.selected}
              onValueChange={this.onGenderChange.bind(this)}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />             
            </Picker>   

            {/* <Button primary onPress={this.onClickButton}><Text>Click Me! </Text>  </Button>

            {this.state.toggleDropdown &&  //cek if toggle is true or false
                data.map((item, index) => { //loop the first dropdown
                    return (
                        <Content key={index}>
                            <Text style={{backgroundColor: '#CCC'}} >{item.title}</Text>
                            <Picker mode="dropdown" > 
                                {item.items.map((value, idx) => { //loop the second dropdown
                                    return(
                                        <Item key={idx} label={value} value={idx}  onPress={this.onClickGenderItem} />
                                    )
                                })}
                            </Picker>
                         </Content>
                    )
                })
            } 
        <RkTextInput
          rkType='rounded'
          placeholder='Gender ( male/female )'
          value={this.props.gender}
          onChangeText={gender => this.onGenderChange(gender)}
          onBlur={() => { this.validateInput('gender', this.props.gender); }}
        /> */}
        <View>
        { this.renderFormError('gender') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {   
    marginHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 1
  },
  field: {
    height: 30,
   
  }
}));

const mapStateToProps = ({ auth }) => {
  const { gender } = auth;
  return { gender };
};

export default connect(mapStateToProps, {
  genderChanged
})(GenderTextInput);
