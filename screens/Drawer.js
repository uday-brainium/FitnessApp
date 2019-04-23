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
import {check_subscription} from  '../actions/payment_action'
import { connect } from 'react-redux';
import LoadingSpinner from './../components/Loading/LoadingSpinner';
let ls = require('react-native-local-storage');
import { base_url } from './../config/appConstants'

class Drawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      callcount: 0,
      is_subscribed: false
    }

  setTimeout(() => {
    this.fetchuser()
  },1000)
  this.fetchuser()
  }

  static navigationOptions = {
    header: null,
  };

  fetchuser = () => {
    ls.get('userdata').then((data) => {
      let uid = JSON.parse(data)._id
      this.props.check_subscription(uid)
    })
  }

  navigateTo = (screen) => {
    const { state, navigate } = this.props.navigation;
    if(screen == 'subscription_screen') {
      if(this.props.subscribed == true) {
        navigate('Token_transfer', { go_back_key: state.key });
      } else {
        navigate('subscription_screen', { go_back_key: state.key });
      }
    } else {
      navigate(screen, { go_back_key: state.key });
    }
  }

  componentWillReceiveProps() {
     ls.get('userdata').then((data) => {
      this.setState({userInfo: JSON.parse(data)})
    })
  }


  render() {
    
    if((typeof this.props.fbuserData != 'undefined')  && (typeof this.props.fbuserData.email != 'undefined') && this.state.callcount < 5) {
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
                onPress={() => this.props.navigation.toggleDrawer() }>
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
                {  this.state.userInfo != null && this.state.userInfo.user_type == 'facebook' &&
                  <Image
                     style={{height: 140, width: 140}}
                    rkType='big'
                    source={{uri: 'http://graph.facebook.com/'+this.state.userInfo.social_id +'/picture?type=large' }} />
                }
                {  this.state.userInfo != null && this.state.userInfo.user_type == 'Normal' &&
                  <Image
                    style={{height: 140, width: 140}}
                    rkType='big'
                    source={
                      this.state.userInfo.image_url == "" ?
                      require('./../assets/images/app-icon.png') :
                      {uri: `${base_url}${this.state.userInfo.image_url}`}
                    } />
                }
              </View>

                { this.state.userInfo != null && this.state.userInfo.user_type == 'facebook' &&
                  <RkText rkType='header2' style ={{marginBottom:10}} >{this.state.userInfo.name}</RkText>
                }
                { this.state.userInfo != null && this.state.userInfo.user_type == 'Normal' &&
                  <RkText rkType='header2' style ={{marginBottom:10}} >{this.state.userInfo.name_first} {this.state.userInfo.name_last}</RkText>
                }

                  <Image  style={[{ resizeMode: 'contain', width:percentageWidth}]} source={require('../assets/images/how_it_work_line.png')}/>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'profile_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('profile_screen')}> Profile </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'dashboard_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('dashboard_screen')}> Activity Tracker </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'Token_transfer' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('Token_transfer')}> Token Transfer </RkText>
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'calorie_tracker_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('Transfer_history')}> Transfer History </RkText>
                  <RkText rkType='header6' onPress={() => this.navigateTo('subscription_screen')} style={[styles.textStyle, routes == 'subscription_screen' ? {color: 'blue'} : {color: 'black'}]}> Subscription </RkText>
                  {/* <RkText rkType='header6' style={[styles.textStyle, routes == 'payment_screen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('payment_screen')}> Payment </RkText> */}
                 {this.state.userInfo != null && this.state.userInfo.user_type == 'Normal' &&
                  <RkText rkType='header6' style={[styles.textStyle, routes == 'changePasswordScreen' ? {color: 'blue'} : {color: 'black'}]} onPress={() => this.navigateTo('changePasswordScreen')} > Change Password </RkText>
                 }
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
  marginTop: 25,
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
  profile_img: {
    height: 135,
    width: 135,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#c6a0f5'
  }

}));


const mapStateToProps = (state, auth) => {
 const { fbuserData } = state.fbuserData;

  return { fbuserData, auth, subscribed: state.is_subscribed.is_subscribed };
};

export default connect(mapStateToProps, {
  logoutUser, userDetailsFetch, check_subscription
})(Drawer);
