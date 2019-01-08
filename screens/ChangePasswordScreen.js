import React, { Component } from 'react';
import {
  View,Dimensions,
  TouchableHighlight
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
                         <TouchableHighlight
                           onPress={() =>  params.openDrawer()}>
                            <Avatar
                             rkType='image'
                             source={require('../assets/images/menu.png')}
                           />
                           </TouchableHighlight>
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

          <View style={{ width: width, marginTop:30, height: bodyContainer}}>

              <LoadingSpinner />
              <ErrorMessage />
              <OldPwdTextInput  />
              <NewPwdTextInput />
              <ConfirmPwdTextInput />
              <EmailPwdButton emailPwdBtnStr={'Change'} />


          </View>

    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    flex:1,
    alignSelf: 'stretch',
    alignItems:'center',
    justifyContent:'center',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start'
  },
  avatar: {},
  text: {
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  }
}));
export default ChangePasswordScreen;
