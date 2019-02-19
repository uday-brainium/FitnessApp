import React, { Component } from 'react';
import { View, Text, Modal, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { Right } from 'native-base';
let activityInspector


export default class Activity_warning extends Component {
  constructor(props){
    super(props)

    this.state = {
      warningModal: false,
      alertModal: false,
      cheatingCount: 0,
      typeString: '',
      trackingStatus: false
    }
  }

  componentDidMount() {
      //inspector will run every 10s for checking if user is cheating 
      activityInspector = setInterval(() => {
         this.detectCheating()
      }, 15000);
  }

  detectCheating = () => {
      if(this.checkSpeed()) {
            this.props.caught()
            this.props.switchActivity('vehicle')
            this.setState({alertModal: true})
        // if(this.state.cheatingCount > 3) {
        //   this.setState({warningModal: true, cheatingCount: 0}, () => {
        //     this.props.caught()
        //     this.props.switchActivity('vehicle')
        //   })
        // } else {
        //   this.setState({cheatingCount: this.state.cheatingCount + 1, alertModal: true})
        // }
      }
  }

  // checkDevicePosition = () => {
  //   let checkStatus = false
  //   let position = this.props.mostProb
  //   let currentAcitivity = this.props.trackingType
  //   console.log("TYPE", currentAcitivity);
    
  //   if(position != '' && position.type != null) {
  //      if(currentAcitivity == 'vehicle' && position.type == 'STILL'){
  //        checkStatus = true
  //      } else if(currentAcitivity == 'walkrun' && (position.type == 'STILL' || position.type == 'IN_VEHICLE' || position.type == 'ON_BICYCLE' || position.type == 'RUNNING')) {
  //        checkStatus = true
  //      } else if(currentAcitivity == 'bycycle' && (position.type == 'STILL' || position.type == 'IN_VEHICLE' || position.type == 'WALKING')) {
  //        checkStatus = true
  //      } else {
  //        checkStatus = false
  //      }
  //   }

  //   return checkStatus
  // }

 checkSpeed = () => {
   let speedStatus = false
   let speed = this.props.speed
   let currentAcitivity = this.props.trackingType
    if(currentAcitivity == 'walkrun' && speed > 4) {
      speedStatus =  true
    } else if(currentAcitivity == 'bycycle' && speed > 12) {
      speedStatus = true
    } else {
      speedStatus = false
    }

   return speedStatus
 }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
   // console.log('CHECKDEVICE', this.checkDevicePosition());
    //console.log('SPEED', this.checkSpeed());
    //console.log("POSITION", this.props.mostProb);
    if(this.props.trackingType == 'walkrun') {
      this.setState({typeString: 'Walking'})
    } else if(this.props.trackingType == 'bycycle') {
      this.setState({typeString: 'Bycycle'})
    } else if(this.props.trackingType == 'vehicle') {
      this.setState({typeString: 'Vehicle'})
    }

    //Setting the tracking status
    this.setState({trackingStatus: nextProps.trackingStatus})
    
  }

  render() {
    const {warningModal} = this.state
    return (
      <View>
        <Modal
         animationType="slide"
         transparent={true}
         visible={this.state.warningModal}
         onRequestClose={() => {
           this.setState({warningModal: false})
         }}>
           <View style={{backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
             <View style={styles.popup_screen}>
              <View style={styles.warningBox}>
                <Image
                 style={{width: 130, height: 130, marginBottom: 20}}
                 source={require('./../../assets/images/bell_icon.png')}
                />

                <Text style={styles.headWarning}>Activity stoped !</Text>
                <Text style={styles.warningText}>
                  It seems you are not in the mood you have selected !
                  Please choose the correct mood and restart.
                </Text>                
              </View>

              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <View>
                {/* <TouchableOpacity style={styles.okBtn}>
                    <Text style={{textAlign: 'right'}}>Okay</Text> 
                  </TouchableOpacity> */}
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.setState({warningModal: false})} style={styles.okBtn}>
                    <Text style={styles.okBtnText}>Close</Text> 
                  </TouchableOpacity>
                </View>
              </View>
             
             </View>
           </View>
         </Modal>


         <Modal
         animationType="fade"
         transparent={true}
         visible={this.state.alertModal}
         onRequestClose={() => {
           this.setState({alertModal: false})
         }}>
           <View style={{backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
             <View style={styles.popup_screen}>
              <View style={styles.warningBox}>
                <Image
                 style={{width: 90, height: 90, marginBottom: 20}}
                 source={require('./../../assets/images/warning_icon.png')}
                />

                <Text style={styles.headAlert}>Activity switched !</Text>
                <Text style={styles.alertText}>
                 Detected speed increase so activity type switched to Vehicle.
                </Text>                
              </View>

              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <View>
                {/* <TouchableOpacity style={styles.okBtn}>
                    <Text style={{textAlign: 'right'}}>Okay</Text> 
                  </TouchableOpacity> */}
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.setState({alertModal: false})} style={styles.okBtn}>
                    <Text style={styles.okBtnText}>Continue</Text> 
                  </TouchableOpacity>
                </View>
              </View>
             
             </View>
           </View>
         </Modal>
 
      </View>
   )
  }
 
}

const styles = StyleSheet.create({
  popup_screen: {
    width: '90%',
    height: 270,
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
  warningBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  warningText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
  headWarning: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  okBtn: {
    justifyContent:'flex-end',
    marginTop: 15,
    marginRight: 20,
    borderWidth: 2,
    padding: 5,
    borderRadius: 5
  },
  okBtnText: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold'
  },
  alertText: {
    textAlign: 'center',
    color: '#ffb108',
    fontSize: 18,
  },
  headAlert: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffb108'
  },
})