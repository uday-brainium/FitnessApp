import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  Alert,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux'
import { saveOtherDetails } from '../actions/fbLogin_action'
import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import { Icon } from 'react-native-elements'
import NavigatorService from '../utils/navigator';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import ActivityRecognition from 'react-native-activity-recognition'
import Dashborad from './../components/dashboard'
import { design } from '../config/stylsheet';
const { width, height } = Dimensions.get('window');
let ls = require('react-native-local-storage');
var PushNotification = require('react-native-push-notification');
let timeIntervalFunction
let distanceAddition = 0
let walkDistanceAddition = 0
let cycleDistanceAddition = 0
let vehicleDistanceAddition = 0

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
      console.log( 'TOKEN:', token );
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );
      let currentPath = NavigatorService.getCurrentRoute()
      // if(currentPath.routeName != "dashboard_screen") {
      //   NavigatorService.reset('dashboard_screen')
      // }
      // process the notification
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "FitnessAPP",
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
      alert: true,
      badge: true,
      sound: true
  },
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,
  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
});

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
      speed: 0,
      btn_text: false,
      maxUp: 0,
      prevCount: 0,
      modalVisible: false,
      height: '',
      weight: '',
      userdata: {},
      modalErr: '',
      loading: false,
      saveSuccess: false,
      trackingStatus: false,
      recordedData: {
        totalDistance: 0,
      },
      lastKnownLat: 0,
      LastKnownLng: 0,
      walkingDistance: 0,
      cycleDistance: 0,
      vehicleDistance: 0,
      alertVisible: 0,
      trackingType: '',
    }
  }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Activity Tracker '} </RkText>),
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); 
    this.track()
    this.props.navigation.setParams({
          openDrawer: this.openDrawerNow
      });
    ls.get('userdata').then((data) => {
      console.log('FBLOGIN USERDATA', JSON.parse(data));
      this.setState({userdata: JSON.parse(data)}, () => {
        if(this.state.userdata.heightWeight == 'false') {
          ls.get('modalflag').then((data) => {
            if(data != 'true') 
            this.setState({modalVisible: true})
          })
        }
      })
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps != null &&  nextProps.allState.fbuserData != null) {
      if(nextProps.allState.fbuserData.modalflag == true) {
        ls.save('userdata', JSON.stringify(nextProps.allState.fbuserData.fbuserData.res.message))
        ls.save('modalflag', 'true').then(() =>{
          ls.save('height', this.state.height)
          ls.save('weight', this.state.weight)
          this.setState({saveSuccess: true}, () => {
            setTimeout(() =>{
              this.setState({modalVisible: false})
            },3000)
          })
        })
      }
    }
  }

  openDrawerNow = () => {
    this.props.navigation.toggleDrawer()
  }

  handleBackPress = () => {
    if(this.state.trackingStatus) {
      Alert.alert(
        'Activity tracker is running..',
        'Dont close the app while activity tracker is running.',
        [
          {text: 'Okay', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Stop tracking', onPress: () => this.stopInterval()},
        ],
        { cancelable: false }
      )
      return true;
    } else {
      return false
    }
  }

  showNotification = () => {
      PushNotification.localNotification({
        /* Android Only Properties */
        id: '1', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        ticker: "Activity tracker running..", // (optional)
        autoCancel: false, // (optional) default: true
        largeIcon: "app_icon", // (optional) default: "ic_launcher"
        smallIcon: "app_icon", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "FitnessApp activity tracker is tracking your activity", // (optional) default: "message" prop
        //subText: "This is a subText", // (optional) default: none
        color: "green", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 100, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: true, // (optional) set whether this is an "ongoing" notification
        priority: "max", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        importance: "max", // (optional) set notification importance, default: high
    
        // /* iOS only properties */
        // alertAction: // (optional) default: view
        // category: // (optional) default: null
        // userInfo: // (optional) default: null (object containing additional notification data)
    
        /* iOS and Android properties */
        title: "Activity tracker running..", // (optional)
        message: "FitnessApp activity tracker is tracking your activity", // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        //actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    });
  }

  cancleNotification = () => {
    PushNotification.cancelAllLocalNotifications()
  }


  calcDistance = () => {
   
    //if(this.state.mostProb.type != "STILL") {
      if(this.state.lastKnownLat !== 0) {
          let distance = this.getDistanceFromLatLonInKm(
            this.state.lastKnownLat, this.state.LastKnownLng, this.state.updatedLat, this.state.updatedLng
          )
          if(this.state.lastKnownLat != this.state.updatedLat) {
            distanceAddition = (distanceAddition + distance)
          }
        this.setState({distanceTravelled: (distanceAddition / 1)})

      //Total distance covered by walking
        if(this.state.trackingType === "walkrun"){
          let distance = this.getDistanceFromLatLonInKm(
            this.state.lastKnownLat, this.state.LastKnownLng, this.state.updatedLat, this.state.updatedLng
          )
          if(this.state.lastKnownLat != this.state.updatedLat) {
            walkDistanceAddition = (walkDistanceAddition + distance)
          }
          this.setState({walkingDistance: (walkDistanceAddition / 1 )})
        }

        //Total distance covered by vehicle
        if(this.state.trackingType === "vehicle"){
          let distance = this.getDistanceFromLatLonInKm(
            this.state.lastKnownLat, this.state.LastKnownLng, this.state.updatedLat, this.state.updatedLng
          )
          if(this.state.lastKnownLat != this.state.updatedLat) {
            vehicleDistanceAddition = (vehicleDistanceAddition + distance)
          }
          this.setState({vehicleDistance: (vehicleDistanceAddition / 1)})
        }
        
        //Total distance covered by cycle
        if(this.state.trackingType === "bycycle"){
          let distance = this.getDistanceFromLatLonInKm(
            this.state.lastKnownLat, this.state.LastKnownLng, this.state.updatedLat, this.state.updatedLng
          )
          if(this.state.lastKnownLat != this.state.updatedLat) {
            cycleDistanceAddition = (cycleDistanceAddition + distance)
          }
          this.setState({cycleDistance: (cycleDistanceAddition / 1)})
        }
      }
   // }

    console.log("PREV-LAT", this.state.lastKnownLat);
    console.log("UPDATED-LAT", this.state.updatedLat);
    console.log("MODE", this.state.mostProb);
     
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

  startTracing = (type) => {
    clearInterval(timeIntervalFunction);
    this.cancleNotification()
    this.setState({
      btn_text: !this.state.btn_text, 
      trackingStatus: true, 
      alertVisible: 1, 
      trackingType: type,
      // walkingDistance : 0,
      // cycleDistance: 0,
      // vehicleDistance: 0,
    })
  
      var options = {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 3600000
      };
      navigator.geolocation.getCurrentPosition((pos) => {
          this.setState({initLat: pos.coords.latitude, initLng:  pos.coords.longitude})
      }, (err) => {
          Alert.alert(
            'Enable GPS location',
            'Please enable location service on your device.',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
      }, options);
    
   // this.updateNewCords()
    timeIntervalFunction = setInterval( () => {
      this.updateNewCords()
    }, 3000)
  }

  updateNewCords = (lat, lng) => {
      var options = {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((pos) => {
       // console.log("POSITION", pos);
      if(this.state.trackingStatus) {
        if(pos.coords.accuracy < 50) {
          this.state.alertVisible === 1 ? this.showNotification() : ''
          this.setState({updatedLat: pos.coords.latitude, updatedLng: pos.coords.longitude, speed: pos.coords.speed, alertVisible: 2})
          setTimeout(() => { this.setState({lastKnownLat: pos.coords.latitude, LastKnownLng: pos.coords.longitude}) }, 2000)
          this.calcDistance()
        }
      }
        
      }, (err) => {
       console.log("Location ERR", err);
       
      }, options);
  }

  stopInterval = () => {
    this.cancleNotification()
    distanceAddition = 0
    walkDistanceAddition = 0
    cycleDistanceAddition = 0
    vehicleDistanceAddition = 0
    this.setState({
      btn_text: !this.state.btn_text, 
      trackingStatus: false, 
      alertVisible: 5,
      trackingType: ''
    })
    let recordedData = Object.assign({}, this.state.recordedData);
    recordedData.totalDistance =  this.state.distanceTravelled > 10 ? (this.state.distanceTravelled * 100 ).toFixed(2) : (this.state.distanceTravelled * 1000 ).toFixed(2)
    this.setState({recordedData}, () => {
      this.setState({distanceTravelled: 0, initLat: '', initLng: '', latitude: '', longitude: ''},() => {
        ToastAndroid.showWithGravity(
          'Activity tracking stopped',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
    });
    clearInterval(timeIntervalFunction);
  }

  saveOtherData = () => {
    let {height, weight, userdata} = this.state
    if(height == "" || height.length != 3 && weight == "" || weight.length != 2 ) {
      this.setState({modalErr: 'Please enter valid details !'})
    } else {
      this.setState({modalErr: '', loading: true})
      let sendData = {
        height,
        weight,
        userid: userdata._id
      }
        this.props.saveOtherDetails(sendData)
    }
  }


  render() {
    return (
        <Container >
          {this.state.alertVisible === 1 && 
              <View style={{padding: 5, backgroundColor: '#f78649'}}>
                <Text style={{textAlign: 'center', color: '#fff'}}>Please wait while we are getting your accurate location.</Text>
              </View>
            }
            {this.state.alertVisible === 2 &&
              <View style={{padding: 5, backgroundColor: '#2dcb6e'}}>
                <Text style={{textAlign: 'center', color: '#fff'}}>Activity tracker is running...</Text>
              </View> 
            }
          <Content>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false})
            }}> 
              <View style={{backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
               <View style={styles.popup_screen}>
               <View style={styles.popup_head}>
                <Text style={styles.popup_head_text}>Please tell us more about you </Text>
               </View>

                <View style={styles.from_row}>
                  <View style={{width: '45.5%', marginLeft: '5%'}}>
                    <Item floatingLabel style={styles.field} >
                      <Label style={styles.fields}>Height (cm)</Label>
                      <Input 
                        style={styles.input_text}
                        value={this.state.height}
                        keyboardType="phone-pad"
                        maxLength={3}
                        onChangeText={(height) => this.setState({height})}
                      />
                    </Item>
                  </View>

                  <View style={{width: '45.5%'}}>
                  <Item floatingLabel style={styles.field} >
                      <Label style={styles.fields}>Weight (kg)</Label>
                      <Input
                        style={styles.input_text}
                        value={this.state.weight}
                        keyboardType="phone-pad"
                        maxLength={2}
                        onChangeText={(weight) => this.setState({weight}) }
                      />
                    </Item>
                  </View>
                </View>
                
                <Text style={styles.err}>{this.state.modalErr}</Text>
    
                <View style={styles.saveBtn_view}>
                { this.state.loading ? 
                   this.state.saveSuccess ? 
                    <View>
                      <Text style={{marginBottom: '5%', color: 'green', fontSize: 20}}>Successfully updated</Text>
                    </View> :
                    <ActivityIndicator style={{marginBottom: '5%'}} size="large" color="green" />
                  :
                  <TouchableOpacity onPress={this.saveOtherData} style={styles.popup_saveBtn}>
                    <Text style={styles.btn_text}> Save </Text>
                  </TouchableOpacity>
                }
                </View>
               </View>
              </View>
            </Modal>

            <View style={{ paddingTop: 15, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* <View>
                {!this.state.trackingStatus &&
                   <TouchableOpacity style={design.top_btn} onPress={this.startTracing}>
                   <Text style={design.top_btn_text}>{this.state.trackingStatus ? 'Stop activity' : 'Start activity'} </Text>
                 </TouchableOpacity>
                }
              </View> */}
              {/* <View>
                { this.state.trackingStatus &&
                 <TouchableOpacity style={design.top_btn_right} onPress={this.stopInterval}>
                   <Text style={design.top_btn_text}>Stop & Reset</Text>
                 </TouchableOpacity>
                }
              </View> */}
            </View>
  
             <Dashborad
               startActivity = {(type) => this.startTracing(type)}
               stopActivity = {() => this.stopInterval()}
               type = {this.state.mostProb.type == null ? "empty" : this.state.mostProb}
               distance = {this.state.distanceTravelled}
               speed = {this.state.speed}
               startedTracking = {this.state.trackingStatus}
               recordedData = {this.state.recordedData}
               trackingType = {this.state.trackingType}
               walkrunDistance = { this.state.walkingDistance }
               bikeDistance = { this.state.cycleDistance }
               vehicleDistance = { this.state.vehicleDistance }
              />
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    track_now_btn: {
      padding: 10,
      borderTopLeftRadius: 20,
      backgroundColor: '#C5A0F4',
    },
    track_now_btn_right: {
      padding: 10,
      borderTopRightRadius: 20,
      backgroundColor: '#C5A0F4',
    },
    main_row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn_text: {
      color: '#fff',
      textAlign: 'center'
    },
    img_bg: {
      width: '100%',
      height: 200
  },
  popup_screen: {
    width: '90%',
    height: 250,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
    height: 1,
    width: 0
    },
    elevation: 10
  },
  from_row: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '2%'
  },
  fields: {
    textAlign: 'center',
    fontSize: 20
  },
  input_text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000'
  },
  popup_head: {
    padding: 10,
    paddingTop: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
  popup_head_text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'roboto'
  },
  popup_saveBtn: {
    padding: 10,
    width: '50%',
    backgroundColor: '#2FDA54',
    borderRadius: 20,
  },
  saveBtn_view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  },
  err: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: '5%',
    textAlign: 'center'
  }
})

function mapStateToProps(state) {
  return {
   allState: state
  }
}


export default connect(mapStateToProps, {saveOtherDetails})(Dashboard_screen)
