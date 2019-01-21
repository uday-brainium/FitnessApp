import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Button
} from 'react-native';

import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import NavigatorService from './../utils/navigator';
import Profile from '../components/profile'
let ls = require('react-native-local-storage');

class Profile_Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        userData: {}
      }
    }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Profile '} </RkText>),
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

       ls.get('userdata').then((data) => {
         console.log("DATA", data);
          this.setState({userData: data})
       })
   }

   openDrawerNow = () => {
     this.props.navigation.toggleDrawer()
   }

  render() {
    return (
        <View>
          <Profile nav={this.props.navigation} userdata={this.state.userData} />
        </View>
    );
  }
}


export default Profile_Screen;
