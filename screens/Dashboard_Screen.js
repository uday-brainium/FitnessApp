import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import NavigatorService from '../utils/navigator';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ActivityRecognition from 'react-native-activity-recognition'
import Dashborad from './../components/dashboard'
let ls = require('react-native-local-storage');
let timeIntervalFunction

class Dashboard_screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mostProb: {},
      distance: "",
      latitude:'',
      longitude: '',
      coordinate: '',
      routeCoordinates: '',
      distanceTravelled: 0,
      initLat: '',
      initLng: '',
      updatedLat: '',
      updatedLng: '',
      btn_text: false,
    }
  }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Activity Tracker '} </RkText>),
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
    this.track()
    this.props.navigation.setParams({
          openDrawer: this.openDrawerNow
      });
    ls.get('userdata').then((data) => {
      console.log('FBLOGIN USERDATA', data);
    })
  }

  openDrawerNow = () => {
    this.props.navigation.toggleDrawer()
  }


  calcDistance = () => {
    this.setState({distanceTravelled: this.getDistanceFromLatLonInKm(
      this.state.initLat, this.state.initLng, this.state.updatedLat, this.state.updatedLng
    )})
  }

   //Heversine formula
   getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

   deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  track = () => {
    this.unsubscribe = ActivityRecognition.subscribe((detectedActivities) => {
      this.setState({mostProb: detectedActivities.sorted[0]})
    })

    let detectionIntervalMillis = 0
    ActivityRecognition.start(detectionIntervalMillis)
    this.setState({distance: detectionIntervalMillis})
  }

  startTracing = () => {
    this.setState({btn_text: !this.state.btn_text})
    var options = {
      enableHighAccuracy: true,
      timeout: 25000,
      maximumAge: 3600000
    };
    navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({initLat: pos.coords.latitude, initLng:  pos.coords.longitude})
    }, (err) => {
      console.log("Location error", err);
    }, options);

   // this.updateNewCords()
   timeIntervalFunction = setInterval(() => {
        this.updateNewCords()
      }, 3000)

  }

  updateNewCords = () => {
      var options = {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({updatedLat: pos.coords.latitude, updatedLng: pos.coords.longitude})
        this.calcDistance()
      }, (err) => {
         console.log("Location error", err);
      }, options);
  }

  stopInterval = () => {
    this.setState({btn_text: !this.state.btn_text})
    clearInterval(timeIntervalFunction);
  }

  resetCounter = () => {
    this.setState({distanceTravelled: 0, initLat: '', initLng: '', latitude: '', longitude: ''},() => {
      ToastAndroid.showWithGravity(
        'Counter reseted',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    })
  }

  render() {
    return (
        <Container >
          <Content >
          <View style={{paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%'}}>
           <View style={styles.main_row}>
            <View>
                <TouchableOpacity  style={styles.track_now_btn} onPress={this.state.btn_text == false ? this.startTracing : this.stopInterval}>
                 <Text style={styles.btn_text}> {this.state.btn_text == false ? 'Start tracking' : 'STOP'} </Text>
                </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity disabled={this.state.btn_text ? true : false}  style={[styles.track_now_btn, {backgroundColor: this.state.btn_text ? 'gray' : '#C5A0F4'}]} onPress={this.resetCounter}>
                <Text style={styles.btn_text}> Reset </Text>
              </TouchableOpacity>
            </View>
           </View>
          </View>

             <Dashborad
               startActivity = {() => this.startTracing}
               type = {this.state.mostProb}
               distance = {this.state.distanceTravelled}
              />
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    track_now_btn: {
      padding: 10,
      borderRadius: 30,
      backgroundColor: '#C5A0F4',
    },
    main_row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    btn_text: {
      color: '#fff',
      textAlign: 'center'
    },
    img_bg: {
      width: '100%',
      height: 200
  },
})

export default Dashboard_screen;
