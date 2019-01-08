import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Button
} from 'react-native';

import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import NavigatorService from './../utils/navigator';
import { Container, Content, Text } from 'native-base';
import Profile from '../components/profile'

class Profile_Screen extends Component {
  constructor(props) {
      super(props);
    }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Profile '} </RkText>),
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
    return (
        <View>
          <Profile nav={this.props.navigation}/>
        </View>
    );
  }
}


export default Profile_Screen;
