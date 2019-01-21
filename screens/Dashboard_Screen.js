import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Modal,
  ActivityIndicator
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
    this.startTracing()
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

  componentWillReceiveProps(nextProps) {
    //console.log("ALL-STATE", nextProps.allState.fbuserData);
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
    this.setState({btn_text: !this.state.btn_text, trackingStatus: true})
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
        console.log("POSITION", pos);
        this.setState({updatedLat: pos.coords.latitude, updatedLng: pos.coords.longitude, speed: pos.coords.speed})
        this.calcDistance()
      }, (err) => {
         console.log("Location error", err);
      }, options);
  }

  stopInterval = () => {
    this.setState({btn_text: !this.state.btn_text, trackingStatus: false, timer: 0})
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
    clearInterval(timerCount);
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
          <Content >

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

             <Dashborad
               startActivity = {() => this.startTracing}
               type = {this.state.mostProb.type == null ? "empty" : this.state.mostProb}
               distance = {this.state.distanceTravelled}
               speed = {this.state.speed}
               startedTracking = {this.state.trackingStatus}
               recordedData = {this.state.recordedData}
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
