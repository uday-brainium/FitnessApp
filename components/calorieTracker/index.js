import React, { Component } from 'react';
import {
  View, 
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Platform
} from 'react-native';
import { Colors } from './../../config/theme'
import Calorie_tracker_tab from './../commons/calorieTrackerTab'
import SwitchToggle from 'react-native-switch-toggle';


class Calorie_tracker extends Component {

  constructor(props) {
    super(props);  

    this.state = {
      switchOn2: false,
      backgroundColorOn: '#C5A0F4',
      backgroundColorOff: '#1fcbbf',
      cardProps: {
        headText: 'Todays Calories Burnt',
        background_color: '#C5A0F4',
        walkValue: 3000,
        bikeValue: 200,
        vehicleValue: 100,
        type: 'colored'
      }
    };
  } 


  getButtonText() {
    return this.state.switchOn2 ? 'Weekly' : 'Daily';
  }
  
  getRightText() {
    return this.state.switchOn2 ? '' : 'Weekly';
  }
  
  getLeftText() {
    return this.state.switchOn2 ? 'Daily' : '';
  }

  onPress2 = () => {
    this.setState({ switchOn2: !this.state.switchOn2 })
    this.setState({backgroundColorOn: !this.state.switchOn2 ? '#C5A0F4' : '#1fcbbf'})
    this.setState({backgroundColorOff: this.state.switchOn2 ? '#1fcbbf' : '#C5A0F4'})

    this.setState(prevState => ({
      cardProps: {
          ...prevState.cardProps,
          headText: !this.state.switchOn2 ? 'Weekly Calories Burnt' : 'Todays Calories Burn',
          walkValue: !this.state.switchOn2 ? 5000 : 3000,
          bikeValue: !this.state.switchOn2 ? 200 : 300,
          vehicleValue: !this.state.switchOn2 ? 100 : 175,
          background_color: this.state.switchOn2 ? '#C5A0F4' : '#1fcbbf',
          type: 'colored'
      }
  }))
  }
  

  render() {
    return (
         <View style={styles.container}>
            <View style={styles.tracker_tab}>
             <Calorie_tracker_tab 
                background = '#fff'
                type = "white"
                headText = "Total Calories Burnt"
                walkValue = '3000'
                bikeValue = '200'
                vehicleValue = '100'
             />
            </View>

            <View style={styles.toggle_switch}>
                <SwitchToggle
                  containerStyle={styles.switch_container_style}
                  backgroundColorOn = {this.state.backgroundColorOn}
                  backgroundColorOff = {this.state.backgroundColorOff}
                  type='1'
                  buttonText={this.getButtonText()}
                  backTextRight={this.getRightText()}
                  backTextLeft={this.getLeftText()}
                  rightContainerStyle={styles.switch_right_container_style}
                  leftContainerStyle={styles.switch_left_container_style}
                  buttonTextStyle={styles.switch_button_text_style} 
                  textRightStyle={styles.switch_right_text_style}
                  textLeftStyle={styles.switch_right_text_style}
                  circleStyle={styles.switch_circal_style}
                  switchOn={this.state.switchOn2}
                  onPress={this.onPress2}
                  circleColorOff='#C5A0F4'
                  circleColorOn='#1fcbbf'
                  duration={500}
                  />
            </View>

             <View style={styles.tracker_tab}>
             <Calorie_tracker_tab 
                background = { this.state.cardProps.background_color }
                type = { this.state.cardProps.type }
                headText = { this.state.cardProps.headText }
                walkValue = { this.state.cardProps.walkValue }
                bikeValue = { this.state.cardProps.bikeValue }
                vehicleValue = { this.state.cardProps.vehicleValue }
             />
            </View>

         </View>
    );
  }
}

const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: Colors.background
        },
        tracker_tab: {
          width: '90%',
          justifyContent: 'center',
          //alignItems: 'center',
          paddingTop: '5%'
        },
        toggle_switch: {
          paddingTop: 30,
          paddingBottom: 5
        },
        switch_container_style: {
          marginTop: 5,
          width: 280,
          height: 45,
          borderRadius: 30,
          backgroundColor: '#C5A0F4',
          padding: 0,
          backgroundColor: '#1fcbbf'
        },
        switch_right_container_style: {
          flex: 0.9,
          alignItems: 'center', 
          justifyContent: 'center',
        },
        switch_left_container_style: {
          position: 'absolute',
          left: 35,
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center'
        },
        switch_button_text_style: {
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: 18, 
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#ffffff'
        },
        switch_right_text_style: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#ffffff'
        },
        switch_circal_style: {
          justifyContent: 'center',
          width: 140,
          height: 45,
          borderRadius: 30,
          backgroundColor: '#C5A0F4', // rgb(102,134,205)
        }
    })

export default Calorie_tracker;
