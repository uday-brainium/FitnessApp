import React, { Component } from 'react';
import {
  Image,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten';

import { Avatar } from '../components/avatar';
import NavigatorService from './../utils/navigator';
import { Header } from 'react-navigation';
import { logoutUser, userDetailsFetch } from '../actions';
import { connect } from 'react-redux';
import LoadingSpinner from './../components/Loading/LoadingSpinner';


class Menu_Screen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  navigateTo = (screen) => {
    const { state, navigate } = this.props.navigation;
    navigate(screen, { go_back_key: state.key });
  }

  render() {
    let {width, height} = Dimensions.get('window') ;
    // 80% width
    let percentageWidth = (width * .8) ;
    // 25% height
    let percentageHeight = (height / 4) ;

    return (
      <View  style={styles.container}>
       <ScrollView >
          <View  style={styles.headerHeight}>
            <View  style={styles.header}>
                        <TouchableHighlight
                          onPress={() => NavigatorService.reset('dashboard_screen')}>
                          <Avatar
                            rkType='image'
                            source={require('../assets/images/menu_close.png')}
                          />
                          </TouchableHighlight>

            </View>
          </View>

           <LoadingSpinner />
            <View style={styles.body}>
                  <Avatar
                            rkType='big'
                            source={require('../assets/images/profile_holder.png')} />

                  <RkText rkType='header3' style ={{marginBottom:10}} > User Display Name .... </RkText>
                  <Image  style={[{ resizeMode: 'contain', width:percentageWidth}]} source={require('../assets/images/how_it_work_line.png')}/>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('terms_screen')}> Terms & Condition </RkText>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('profile_screen')}> Profile </RkText>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('dashboard_screen')}> Activity Tracker </RkText>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('Token_transfer')}> Token Transfer </RkText>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('calorie_tracker_screen')}> Calorie Tracker </RkText>
                  <RkText rkType='header6' onPress={() => this.navigateTo('subscription_screen')} style={styles.textStyle}> Subscription </RkText>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('payment_screen')}> Payment </RkText>
                  <RkText rkType='header6' style={styles.textStyle} onPress={() => this.navigateTo('changePasswordScreen')} > Change Password </RkText>
                  <RkText rkType='header6' style={styles.textStyle}
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
  marginHorizontal: 16,
  flexDirection:'row',
  marginTop: 20,
  marginBottom: 10,
  justifyContent:'flex-end',
},
body:{
  flex:1 ,
  justifyContent:'flex-start',
  alignItems: 'center',
  marginTop: 15,
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
  }
}));


const mapStateToProps = ({ userdata }) => {
  const { userdetails } = userdata;
  return { userdetails };
};

export default connect(mapStateToProps, {
  logoutUser, userDetailsFetch
})(Menu_Screen);


// borderRadius: 4,
// borderWidth: 0.5,
// borderColor: '#4A148C',
// color:'#999999'
