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

class Profile_Screen extends Component {
  constructor(props) {
      super(props);
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
