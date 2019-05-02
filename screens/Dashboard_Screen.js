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
  BackHandler, 
} from 'react-native';
let moment = require('moment');
import { connect } from 'react-redux'
import { saveOtherDetails } from '../actions/fbLogin_action'
import { save_acitivity } from '../actions/Activity_action'
import { get_overall_activity, get_weekly_activity } from '../actions/Activity_action'
import { chart_data } from '../actions/Yearly_chart_action'
import  Activity_warning  from './../components/commons/activity_warning'
import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import { Icon } from 'react-native-elements'
import NavigatorService from '../utils/navigator';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import ActivityRecognition from 'react-native-activity-recognition'
import Dashborad from './../components/dashboard'
import { design } from '../config/stylsheet';
import {defaultConfigNotification, distanceInMeters} from './../config/appConstants'
const { width, height } = Dimensions.get('window');
let ls = require('react-native-local-storage');
var PushNotification = require('react-native-push-notification');
import {tokenRateVehicle, tokenRateBike, tokenRateWalking, calorieRate, calorieBurnt} from './../config/appConstants'
let timeIntervalFunction
let distanceAddition = 0
let walkDistanceAddition = 0
let cycleDistanceAddition = 0
let vehicleDistanceAddition = 0

PushNotification.configure({
  onRegister: function(token) {
      // console.log( 'TOKEN:', token );
  },
 // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    // console.log( 'NOTIFICATION:', notification );
    let currentPath = NavigatorService.getCurrentRoute()
  },
  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "TRAN",
  permissions: {
      alert: true,
      badge: false,
      sound: true
  },
  popInitialNotification: false,
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
      callCount: 0,

      vehicleActivityTime: 0,
      bikeActivityTime: 0,
      walkingActivityTime: 0
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
   ls.get('auth-token').then(data => {
     console.log('auth', data);
     
   })
   BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); 
    this.track()
    this.props.navigation.setParams({
          openDrawer: this.openDrawerNow
      });
    ls.get('userdata').then((data) => {
      this.props.chart_data(JSON.parse(data)._id)
      // console.log('FBLOGIN USERDATA', JSON.parse(data).authtoken);
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    PushNotification.localNotification(defaultConfigNotification);
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

    //console.log("PREV-LAT", this.state.lastKnownLat);
   // console.log("UPDATED-LAT", this.state.updatedLat);
    //console.log("MODE", this.state.mostProb);
     
  }

   //Heversine formula
   getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  }

   deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  track = () => {
    this.unsubscribe = ActivityRecognition.subscribe((detectedActivities) => {
      this.setState({mostProb: detectedActivities.sorted[0]})
     // console.log('Object', detectedActivities);
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
        timeout: 50000,
        maximumAge: 36000
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
    
  
  //A loop of collecting coordinates per 3 sec
  timeIntervalFunction = setInterval( () => {
    this.updateNewCords()
  }, 3000)
    
  }

  updateNewCords = () => {
  if(this.state.alertVisible == 2) {
    this.state.trackingType == 'walkrun' ?
      this.setState({walkingActivityTime: this.state.walkingActivityTime + 3 }) :
    this.state.trackingType == 'bycycle' ?
      this.setState({bikeActivityTime: this.state.bikeActivityTime + 3 }) :
    this.state.trackingType == 'vehicle' ?
     this.setState({vehicleActivityTime: this.state.vehicleActivityTime + 3 }) : 0
  }
    
      var options = {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 5000
      };
       navigator.geolocation.getCurrentPosition((pos) => {
        console.log("POSITION-WATCH", pos);
        this.setState({callCount: this.state.callCount + 1})
        if(this.state.trackingStatus) {
          if(pos.coords.accuracy < 30) {
            this.state.alertVisible === 1 ? this.showNotification() : ''
            this.setState({updatedLat: pos.coords.latitude, updatedLng: pos.coords.longitude, speed: pos.coords.speed, alertVisible: 2})
            setTimeout(() => { this.setState({lastKnownLat: pos.coords.latitude, LastKnownLng: pos.coords.longitude}) }, 700)
            this.calcDistance()
          }
        }
        
      }, (err) => {
       console.log("Location ERR", err);
      }, options);
      
      // let time = 0
      // if(this.state.trackingType == 'walkrun') {
      //   time = this.state.walkingActivityTime
      // } else if(this.state.trackingType == 'bycycle') {
      //   time = this.state.bikeActivityTime
      // } else if(this.state.trackingType == 'vehicle') {
      //   time = this.state.vehicleActivityTime
      // }

      // let b = calorieBurnt(this.state.trackingType, time, this.state.userdata.weight)
      // console.log("Calorie-burned", b);
       
  } 

  stopInterval = () => {
    this.saveActivity()
    this.cancleNotification()
    this.setState({
      btn_text: !this.state.btn_text, 
      trackingStatus: false, 
      btn_text: !this.state.btn_text, 
      trackingStatus: false, 
      alertVisible: 5,
      trackingType: '',
      walkingDistance: 0,
      cycleDistance: 0,
      vehicleDistance: 0,
      distanceTravelled: 0,
      walkingActivityTime: 0,
      bikeActivityTime: 0,
      vehicleActivityTime: 0,
      speed: 0
    })
    distanceAddition = 0
    walkDistanceAddition = 0
    cycleDistanceAddition = 0
    vehicleDistanceAddition = 0
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

  saveActivity = () => {
    const {userdata, distanceTravelled, walkingDistance, cycleDistance, vehicleActivityTime, walkingActivityTime, bikeActivityTime, vehicleDistance} = this.state
    let walkdistance = (walkingDistance * 1000)
    let vehicleDistances = (vehicleDistance * 1000)
    let bikeDistance = (cycleDistance * 1000)
    let walkingTokens = ((walkingDistance * 1000) * tokenRateWalking)
    let cycleTokens = ((cycleDistance * 1000) * tokenRateBike)
    let vehicleTokens =((vehicleDistance * 1000) * tokenRateVehicle)
    let walkingcalories = (calorieBurnt('walkrun', walkingActivityTime, userdata.weight))
    let bikecalories = (calorieBurnt('bycycle', bikeActivityTime, userdata.weight))
    let vehiclecalories = (calorieBurnt('vehicle', vehicleActivityTime, userdata.weight))
    let totalCalories = (walkingcalories + bikecalories + vehiclecalories)
    let totalToken = (walkingTokens + cycleTokens + vehicleTokens)
    let data = {
      _userid: userdata._id,
      totalToken,
      totalCalories,
      totalDistance: `${(distanceTravelled * 1000)}`,
      walkdistance,
      walkingcalories,
      walkingtokens: walkingTokens,
      bikeDistance,
      bikecalories,
      cycleTokens,
      vehicleDistances,
      vehiclecalories,
      vehicletokens: vehicleTokens
    }
    this.props.save_acitivity(data).then(() => {
      this.props.get_weekly_activity(this.state.userdata._id)
      this.props.get_overall_activity(this.state.userdata._id)
      this.props.chart_data(this.state.userdata._id)
    })
    
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

  //if cheating stop the activity and clear the data
  caughtCheat = () => {
    const {trackingType} = this.state
 
    this.setState({
      vehicleDistance: trackingType == 'walkrun' ? this.state.walkingDistance : this.state.cycleDistance,
      vehicleTokens: trackingType == 'walkrun' ? (this.state.walkingTokens / 100) : (this.state.cycleTokens / 10) ,
    }, () => {
      this.setState({
        walkingDistance: 0,
        walkingTokens: 0,
        cycleDistance: 0,
        cycleTokens: 0
      }, () => {
        this.stopInterval()
      })
    })
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
                        maxLength={3}
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

            <Activity_warning {...this.state} 
             caught={() => this.caughtCheat()}
             switchActivity = {(type) => this.startTracing(type)} />

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
               userWeight = {this.state.userdata.weight}
               walkingTime = {this.state.walkingActivityTime}
               bikeTime = {this.state.bikeActivityTime}
               vehicleTime = {this.state.vehicleActivityTime}
               chartData = {this.props.allState.chartData.chart_data}
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


export default connect(mapStateToProps, {saveOtherDetails, save_acitivity, get_overall_activity, get_weekly_activity, chart_data})(Dashboard_screen)
