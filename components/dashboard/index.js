import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView,
  Animated
} from 'react-native';
import { Colors } from './../../config/theme'
import PureChart from 'react-native-pure-chart'
import ProgressCircle from './../commons/progressCircle'
import ActivityTab from './../commons/activityTab'
import SwitchToggle from 'react-native-switch-toggle'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {tokensPerMeter} from './../../config/appConstants'
import {design} from './../../config/stylsheet'
import { Icon } from 'react-native-elements'
let sampleData = [
  {
    seriesName: 'series1',
    data: [
      {x: 'Jan', y: 430},
      {x: 'feb', y: 200},
      {x: 'Mar', y: 170},
      {x: 'Apr', y: 250},
      {x: 'May', y: 10},
      {x: 'June', y: 30},
      {x: 'July', y: 200},
      {x: 'Aug', y: 170},
      {x: 'Sep', y: 250},
    ],
    color: 'violet'
  },
  {
    seriesName: 'series2',
    data: [
      {x: 'Jan', y: 10},
      {x: 'feb', y: 270},
      {x: 'Mar', y: 470},
      {x: 'Apr', y: 257},
      {x: 'May', y: 60},
      {x: 'June', y: 80},
      {x: 'July', y: 20},
      {x: 'Aug', y: 470},
      {x: 'Sep', y: 259},
    ],
    color: 'green'
  }
]

class Activity_tracker extends Component {

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
        type: 'colored',
        percent: 10
      },
      fadeAnim: new Animated.Value(5), 
    };
  }

  componentDidMount() {
    this.setState({percent: 50}) 
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 35,                   // Animate to opacity: 1 (opaque)
        duration: 3000,
        //easing: Easing.inOut(Easing.ease)
        //useNativeDriver: true,           // Make it take a while
      }
    ).start(); 
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
    let distance = this.props.distance > 10 ? (this.props.distance * 100 ).toFixed(1) : (this.props.distance * 1000 ).toFixed(1) 
    let tokens = Math.round(distance * tokensPerMeter)
     //Calculate the percentage of progress circle
    let progressPercent = (tokens / distance * 100 ) 
    
    return (
        <ScrollView>
         <View style={styles.container}>
           <ImageBackground
            source={require('./../../assets/images/actTrackbg.png')}
            style={styles.img_bg}
           >
           {!this.props.startedTracking ?
            <Animated.View style={{justifyContent: 'center', alignItems: 'center', marginTop: this.state.fadeAnim}}>
              <AnimatedCircularProgress
                size={150}
                width={16}
                fill={isNaN(progressPercent) ? 0 : Math.round(progressPercent)}
                lineCap='round'
                tintColor="#2FDA54"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#ffffff">
              {
                (fill) => (
                  <View style={styles.under_circle}>
                    

                    <Text style={[styles.circle_number]}>
                      Activity { distance } M
                    </Text>
                    <Text style={[styles.circle_number]}>
                        Tokens { tokens }
                    </Text>
                    <Text style={[styles.circle_number]}>
                      Calories 10
                    </Text>
                  </View>
                )
              }
              </AnimatedCircularProgress>
              </Animated.View>
            :
            <Animated.View style={{ flex: this.state.fadeAnim, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.head_circle}>
              <View>
                
                <Icon
                  name={this.props.type.type == "STILL" ? 'airline-seat-recline-normal' : this.props.type.type == "WALKING" ? 'directions-walk' : this.props.type.type == "IN_VEHICLE" ? "directions-car" : "location-searching"}
                  type='MaterialIcons'
                  color='#ffffff'
                  size = {70}
                />
                
                <Text  style={styles.unit_text}>{this.props.type == "empty" ? 'Detecting..' : this.props.type.type}</Text>
              </View>

              <View>
                <Text  style={styles.unit_head_text}>{ distance } m</Text>
                <Text style={styles.unit_text}>Travelled</Text>
              </View>
              </View>
              
              <Text style={[design.white_medium_text, {alignItems: 'center', paddingTop: 25}]}> Speed: {(this.props.speed).toFixed(2)} (approx)</Text>
            </Animated.View>
            
            
           }
            
           </ImageBackground>
           {/* {<View style={{flex: 0.1, alignItems: 'center'}}>
            <Text style={styles.head_text}>Activity Wise Total Distance/Token</Text>
            <ActivityTab type='normal' switch={!this.state.switchOn2 ? 'left' : 'right'} percent = {this.state.percent}/>
          </View> } */}

            <View style={{ paddingBottom: 18, paddingTop: 30, marginTop: '-3%', alignItems: 'center'}}>
            <SwitchToggle
                  containerStyle={styles.switch_container_style}
                  backgroundColorOn = {this.state.backgroundColorOn}
                  backgroundColorOff = {this.state.backgroundColorOff}
                  type = "1"
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

            <View style={{flex: 0.1, paddingBottom: 30, alignItems: 'center'}}>
             <ActivityTab type='box' switch={!this.state.switchOn2 ? 'left' : 'right'}  percent = {this.state.percent}/>
            </View>


           <View style={styles.barchart_view}>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Text style={styles.barChart_left_text}>Monthly Overview</Text>
              </View>

              <View>
                <View style={{flex:0.1, flexDirection: 'row'}}>
                  <View style={{ margin: 5}}>
                    <View style={{flex:1, flexDirection: 'row',}}>
                      <View style={{width: 15, height: 15, backgroundColor: 'violet', borderRadius: 5, marginTop: 3}}></View>
                      <View><Text style={styles.barChart_text}>Token</Text></View>
                    </View>
                  </View>
                  <View style={{margin: 5}}>
                  <View style={{flex:1, flexDirection: 'row',}}>
                    <View style={{width: 15, height: 15, backgroundColor: 'green', borderRadius: 5, marginTop: 3}}></View>
                    <View><Text style={styles.barChart_text}>Calories</Text></View>
                   </View>
                  </View>
                </View>
              </View>
           </View>


            <View style={styles.chartContainer}>
             <PureChart data={sampleData} type='bar' />
            </View>

         </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
       container: {
           width: Dimensions.get('window').width,
           backgroundColor: Colors.background,
       },
        img_bg: {
          marginTop: -9,
          width: '100%',
          height: 230
        },
        head_circle: {
          width: '95%',
          //flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row'
        },
        head_text: {
          paddingTop: 2,
          paddingBottom: 0,
          fontSize: 18,
          fontWeight: 'bold',
          color: 'gray'
        },
        barChart_text: {
          textAlign: 'left',
          fontSize: 16,
          fontWeight: 'normal',
          color: 'gray',
          marginLeft: 3
        },
        barChart_left_text: {
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          color: 'gray',
          marginLeft: 20
        },
        barchart_view: {
          flex: 1,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 0
        },
        chartContainer: {
          padding: 25,
          flex:1,
          height: 250,
          padding: '5%',
          width: '90%',
          alignItems: 'center'
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
         // backgroundColor: '#1fcbbf'
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
        },
        track_now_btn: {
          padding: 10,
          borderRadius: 30,
          backgroundColor: '#C5A0F4',
        },
        main_row: {
          flex: 1,
          flexDirection: 'row'
        },
        btn_text: {
          color: '#fff',
          textAlign: 'center'
        },
        unit_head_text: {
          marginTop: 20,
          fontSize: 35,
          color: '#ffffff',
          fontWeight: 'bold',
          textAlign: 'center'
        },
        unit_text: {
          marginTop: '5%',
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center'
        },
        under_circle: {
          alignItems: 'center',
          justifyContent: 'center'
        },
        circle_head: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff'
        },
        circle_number: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff'
        }
    })

export default Activity_tracker;
