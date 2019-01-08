import React, { Component } from 'react';
import {
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkAvoidKeyboard,
} from 'react-native-ui-kitten';

import { Avatar } from '../components/avatar';
import NavigatorService from './../utils/navigator';
import { Header } from 'react-navigation';
import { logoutUser, userDetailsFetch } from '../actions';
import { connect } from 'react-redux';
import LoadingSpinner from './../components/Loading/LoadingSpinner';
let ls = require('react-native-local-storage');

class Drawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      callcount: 0
    }

  setTimeout(() => {
    ls.get('userdata').then((data) => {
      this.setState({userInfo: JSON.parse(data)})
    })
  },1000)

  }

  static navigationOptions = {
    header: null,
  };

  navigateTo = (screen) => {
    const { state, navigate } = this.props.navigation;
    navigate(screen, { go_back_key: state.key });
  }

  render() {

    if(this.props.fbuserData != undefined  && (typeof this.props.fbuserData.name != undefined) && this.state.callcount < 3) {
      ls.get('userdata').then((data) => {
        this.setState({userInfo: JSON.parse(data), callcount: this.state.callcount + 1})
      })
    }

    //alert(this.state.userInfo)
    let {width, height} = Dimensions.get('window') ;
    // 80% width
    let percentageWidth = (width * .8) ;
    // 25% height
    let percentageHeight = (height / 4) ;

    let currentRoute = NavigatorService.getCurrentRoute();
    let routes = currentRoute != null ? currentRoute.routes[currentRoute.routes.length - 1].routeName : {};

    return (
      <View  style={styles.container}>
       <ScrollView >
          <View >
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}>
                <Avatar
                  rkType='image'
                  source={require('../assets/images/menu_close.png')}
                />
                </TouchableOpacity>
            </View>
          </View>

           <LoadingSpinner />
            <View style={styles.body}>
              <View style={styles.profile_img}>
                {  this.state.userInfo != null &&
                  <Avatar
                    rkType='big'
                    source={{uri: 'http://graph.facebook.com/'+this.state.userInfo.id +'/picture?type=large' }} />
                }
              </View>

                { this.state.userInfo != null &&
                  <RkText rkType='header2' style ={{marginBottom:10}} >{this.state.userInfo.name}</RkText>
                }

                  <Image  style={[{ resizeMode: 'contain', width:percentageWidth}]} source={require('../assets/images/how_it_work_line.png')}/>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'profile_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('profile_screen')}> Profile </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'dashboard_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('dashboard_screen')}> Activity Tracker </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'Token_transfer' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('Token_transfer')}> Token Transfer </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'calorie_tracker_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('calorie_tracker_screen')}> Calorie Tracker </RkText>
                  <RkText rkType='header6' onPress={() => this.navigateTo('subscription_screen')} style={[styles.textStyle, routes == 'subscription_screen' ? {color: 'blue'} : {color: 'black'}]}> Subscription </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'payment_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('payment_screen')}> Payment </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'changePasswordScreen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('changePasswordScreen')} > Change Password </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'logout_screen' ? {color: 'blue'} : {color: 'black'}]}
                   onPress={ () => this.props.logoutUser()  }
                  > Logout </RkText>

             </View>
         </ScrollView>
      </View>
    )
  }
}


let styles = RkStyleSheet.create(theme => ({
  container: {
    flex:1,
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 14
  },

headerHeight:{
   height:Header.HEIGHT,
},
header:{
  position: 'absolute',
  alignSelf: 'flex-end',
  flexDirection:'row',
  marginTop: 10,
  marginBottom: 10,
  justifyContent:'flex-end',
},
body:{
  flex:1 ,
  justifyContent:'flex-start',
  alignItems: 'center',
  marginTop: 5,
},
bodyHeader :{
  flex:35 ,
  justifyContent:'center',
  alignItems: 'center',
},
bodyDiver :{
  flex:5 ,
  justifyContent:'center',
  alignItems: 'center',
},
bodyContaint :{
  flex:60 ,
  justifyContent:'center',
  alignItems: 'center',
},
fillParent:{
  flex:1,
  flexDirection:'row',
  marginLeft:20,
  marginRight:20,
},
headerCenter:{
  flex:1
},
headerRight:{
  flex:1
},
textStyle:{
  marginTop: 20,
},
text: {
  color: theme.colors.screen.base,
},
  card: {
    marginVertical: 8,
    height: 125
  },
  post: {
    marginTop: 5,
    marginBottom: 1
  },
  profile_img: {
    marginTop: 10,
    marginBottom: -30
},

}));


const mapStateToProps = (state) => {
 const { fbuserData } = state.fbuserData;
  return { fbuserData };
};

export default connect(mapStateToProps, {
  logoutUser, userDetailsFetch
})(Drawer);
