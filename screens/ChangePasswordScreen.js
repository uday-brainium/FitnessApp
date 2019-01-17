import React, { Component } from 'react';
import {
  View,Dimensions,
  TouchableOpacity
} from 'react-native';
import {RkStyleSheet, RkText,RkTextInput} from 'react-native-ui-kitten';
import { Container,Card, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import { Avatar } from '../components/avatar';
import NavigatorService from './../utils/navigator';
import EmailPwdButton from './../components/Login/EmailPwdButton';

import OldPwdTextInput from './../components/Login/OldPwdTextInput';
import NewPwdTextInput from './../components/Login/NewPwdTextInput';
import ConfirmPwdTextInput from './../components/Login/ConfirmPwdTextInput';
import LoadingSpinner from './../components/Loading/LoadingSpinner';
import ErrorMessage from './../components/ErrorMessage';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
  }
  // show header
  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Change Password '} </RkText>),
           headerLeft: ( <View style={{marginLeft: 16}}>
                         <TouchableOpacity
                           onPress={() =>  params.openDrawer()}>
                            <Avatar
                             rkType='image'
                             source={require('../assets/images/menu.png')}
                           />
                           </TouchableOpacity>
                    </View>),
       };
   };

  componentDidMount() {
    this.props.navigation.setParams({
          openDrawer: this.openDrawerNow
      });
  }

  openDrawerNow = () => {
    this.props.navigation.toggleDrawer()
  }



  render() {
    let height = Dimensions.get("window").height;
    let width = Dimensions.get("window").width;
    let bodyContainer = height ;


    return (

          <View style={{ backgroundColor: '#fff', width: width, height: bodyContainer}}>
            <View style={{ marginTop:30}}>
            <LoadingSpinner />
              <ErrorMessage />
              <OldPwdTextInput  />
              <NewPwdTextInput />
              <ConfirmPwdTextInput />
              <EmailPwdButton emailPwdBtnStr={'Change'} />
            </View>
          </View>

    );
  }
}

export default ChangePasswordScreen;
