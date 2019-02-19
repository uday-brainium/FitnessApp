import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView,
  Animated,
  Image
} from 'react-native';
import { Colors } from './../../config/theme'
import PureChart from 'react-native-pure-chart'
import {design} from './../../config/stylsheet'
import { Icon } from 'react-native-elements'
import Activity_list  from './../commons/activity_list'
import Activity_list_daily from './../commons/Activity_list_daily'
import Activity_list_monthly from './../commons/activity_list_monthly'
import {tokenRateVehicle, tokenRateBike, tokenRateWalking, calorieRate, calorieBurnt} from './../../config/appConstants'


let dataObj = [
  {x: 'January', 'y': 12},
  {x: 'February', 'y': 15},
  {x: 'March', 'y': 1},
  {x: 'April', 'y': 7},
  {x: 'May', 'y': 2},
  {x: 'June', 'y': 120},
  {x: 'July', 'y': 20},
  {x: 'August', 'y': 78},
  {x: 'September', 'y': 34},
  {x: 'October', 'y': 54},
  {x: 'November', 'y': 12},
  {x: 'December', 'y': 45},
]

let dataObjToken = [
  {x: 'Token', 'y': 12},
  {x: 'Token', 'y': 15},
  {x: 'Token', 'y': 1},
  {x: 'Token', 'y': 7},
  {x: 'Token', 'y': 2},
  {x: 'Token', 'y': 120},
  {x: 'Token', 'y': 20},
  {x: 'Token', 'y': 78},
  {x: 'Token', 'y': 34},
  {x: 'Token', 'y': 54},
  {x: 'Token', 'y': 12},
  {x: 'Token', 'y': 45},
]

// let sampleData = [
//   {
//     seriesName: 'Months',
//     data: dataObj,
//     color: 'violet'
//   }, {
//     seriesName: 'Tokens',
//     data: dataObjToken,
//     color: 'pink'
//   }
 
// ]

let sampleData = [
  {
    seriesName: 'Months',
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
    seriesName: 'Tokens',
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

let imagePath = './../../assets/images/'

class Activity_tracker extends Component {
  

  render() {
    const {distance, walkrunDistance, bikeDistance, vehicleDistance} = this.props

    let walkDistanceText = walkrunDistance < 1 ? `${(walkrunDistance * 1000).toFixed(1)} m` : `${(walkrunDistance).toFixed(2)} km`
    let bikeDistanceText = bikeDistance < 1 ? `${(bikeDistance * 1000).toFixed(1)} m` : `${(bikeDistance).toFixed(2)} km`
    let vehicleDistanceText = vehicleDistance < 1 ? `${(vehicleDistance * 1000).toFixed(1)} m` : `${(vehicleDistance).toFixed(2)} km`
    let totalDistanceText = distance < 1 ? `${(distance * 1000).toFixed(1)} m` : `${(distance).toFixed(2)} km`
   
    let walkingTokens = Math.round((walkrunDistance * 1000) * tokenRateWalking)
    let cycleTokens = Math.round((bikeDistance * 1000) * tokenRateBike)
    let vehicleTokens = Math.round((vehicleDistance * 1000) * tokenRateVehicle)

    let totalCalories = Math.round((distance * 1000) * calorieRate)
    let totalToken = (walkingTokens + cycleTokens + vehicleTokens)

    return (
        <ScrollView>
         <View style={styles.container}>
           <ImageBackground
            source={require(`${imagePath}actTrackbg.png`)}
            style={styles.img_bg}
           >
           
            <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.head_circle}>
              <View>
                <Text style={[design.white_medium_text, {textAlign: 'left', fontSize: 20}]}>Session activity</Text>
                {this.props.trackingType === "" ? 
                  <Icon
                  name={"accessibility"}
                  type='MaterialIcons'
                  color='#fff'
                  size = {105}
                /> :
                <Image style={{width: 135, height: 140, resizeMode: 'contain'}} source ={
                  this.props.trackingType === 'walkrun' ?
                  require(`${imagePath}Running_Animation_White_v2.gif`) :
                  this.props.trackingType === 'bycycle' ?
                  require(`${imagePath}Bike_Animation_White_v2.gif`) :
                  this.props.trackingType === 'vehicle' ?
                  require(`${imagePath}Vehicle_Animation_White_v2.gif`) :
                  require(`${imagePath}walkrun2.png`)
              } />
                }
            </View>

              <View>
                <Text style={[design.white_medium_text, {fontSize: 15, textAlign: 'left', textDecorationLine: 'underline'}]}>Distance</Text>
                <Text  style={styles.unit_head_text}>
                    {
                      this.props.trackingType === 'walkrun' ?
                      mainDistance = walkDistanceText :
                      this.props.trackingType === 'bycycle' ?
                      mainDistance = bikeDistanceText :
                      this.props.trackingType === 'vehicle' ?
                      mainDistance = vehicleDistanceText :
                      mainDistance = totalDistanceText
                    }
                  </Text>

                  <Text style={[design.white_medium_text, {fontSize: 15, textAlign: 'left', textDecorationLine: 'underline'}]}>Calories</Text>
                    <Text  style={styles.unit_head_text}>{
                      this.props.trackingType === 'walkrun' ?
                       Math.round(calorieBurnt('walkrun', this.props.walkingTime, this.props.userWeight)) :
                      this.props.trackingType === 'bycycle' ?
                       Math.round(calorieBurnt('bycycle', this.props.bikeTime, this.props.userWeight)) :
                      this.props.trackingType === 'vehicle' ?
                       Math.round(calorieBurnt('vehicle', this.props.vehicleTime, this.props.userWeight)) :
                       0
                    } cal </Text>
                
                <Text style={[design.white_medium_text, {fontSize: 15, textAlign: 'left', textDecorationLine: 'underline'}]}>Tokens</Text>
                    <Text  style={styles.unit_head_text}>{
                      this.props.trackingType === 'walkrun' ?
                        walkingTokens :
                      this.props.trackingType === 'bycycle' ?
                        cycleTokens :
                      this.props.trackingType === 'vehicle' ?
                        vehicleTokens :
                       0
                    } </Text>
                {/* <Text style={styles.unit_text}>Speed</Text> */}
                <Text style={[design.white_medium_text, {fontSize: 15, textAlign: 'left', textDecorationLine: 'underline'}]}>Speed</Text>
                <Text style={styles.unit_head_text}>{Math.round(this.props.speed).toFixed(2)} m/s</Text>
              </View>
              </View>
            </Animated.View>
           </ImageBackground>
          
          <View style={{justifyContent: 'center', paddingBottom: 20, borderBottomWidth: 2, borderBottomColor: '#c6a0f5'}}>
            <Text style={[styles.head_text, {fontWeight: 'normal', fontSize: 18}]}>{!this.props.startedTracking ? 'Choose and start activity tracking' : 'Switch activity type by clicking buttons below'}</Text>
           <View style={[design.common_row, {marginLeft: 10}]}>
              <View>
                <TouchableOpacity onPress={this.props.trackingType == 'walkrun' ? () => this.props.stopActivity() : () => this.props.trackingType == "" ? this.props.startActivity('walkrun') : ''} >
                  <Image
                   style={{height: 100, width: 100, marginLeft:0}} 
                   source={ this.props.trackingType === 'walkrun' ? 
                    require(`${imagePath}WalkRun_Start.png`) : 
                    require(`${imagePath}WalkRun_Stop.png`)} />
                </TouchableOpacity>
               
              </View>
              <View>
                <TouchableOpacity onPress={this.props.trackingType == 'bycycle' ? () => this.props.stopActivity() : this.props.trackingType == "" ? () => this.props.startActivity('bycycle') : ''} >
                  <Image 
                   style={{height: 100, width: 100, marginLeft: 0}}  
                   source={this.props.trackingType === 'bycycle' ? 
                    require(`${imagePath}Bike_Start.png`) : 
                    require(`${imagePath}Bike_Stop.png`)} />
                </TouchableOpacity>
                
              </View>
              <View>
                <TouchableOpacity onPress={this.props.trackingType == 'vehicle' ? () => this.props.stopActivity() : this.props.trackingType == '' ? () => this.props.startActivity('vehicle') : ''} >
                   <Image 
                    style={{height: 100, width: 100}} 
                    source={this.props.trackingType === 'vehicle' ? 
                     require(`${imagePath}Vehicle_Start.png`) : 
                     require(`${imagePath}Vehicle_Stop.png`)} />
                </TouchableOpacity>
               
              </View>
           </View>

            <View>
              <View style={{flexDirection: 'row', margin: 5, paddingTop: 15}}>
              <View>
                  <Icon
                  name={"today"}
                  type='MaterialIcons'
                  color='#c6a0f5'
                  size = {22}
                />
              </View>
              <View> 
                <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Daily Activity</Text>
              </View>
              </View>
              <Activity_list_daily
                dailyDistance = {totalDistanceText}
                dailyCalories = {totalCalories}
                daillyToken = {totalToken}
              />
            </View>

          </View>

          <View>
            <View style={{flexDirection: 'row', margin: 5}}>
             <View>
                <Icon
                name={"today"}
                type='MaterialIcons'
                color='#c6a0f5'
                size = {22}
              />
             </View>
             <View> 
               <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Monthly activity</Text>
             </View>
            </View>
            <Activity_list_monthly
              dailyDistance = {totalDistanceText}
              dailyCalories = {totalCalories}
              daillyToken = {totalToken}
              updateData = {this.props.startedTracking}
            />
          </View>
          

          <View>
            <View style={{flexDirection: 'row', margin: 5}}>
             <View>
                <Icon
                name={"timeline"}
                type='MaterialIcons'
                color='#c6a0f5'
                size = {22}
              />
             </View>
             <View> 
               <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Overall Activity</Text>
             </View>
            </View>
            <Activity_list 
              dailyDistance = {totalDistanceText}
              dailyCalories = {totalCalories}
              daillyToken = {totalToken}
              updateData = {this.props.startedTracking}
            />
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
          marginTop: -20,
          width: '100%',
          height: 230
        },
        head_circle: {
          width: '95%',
          //flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginTop: 2,
        },
        head_text: {
          textAlign: 'center',
          marginBottom: 15,
          marginTop: -5,
          fontSize: 18,
          fontWeight: 'bold',
          color: 'gray',
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
          paddingTop: 10
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
          marginTop: 0,
          fontSize: 16,
          color: '#ffffff',
          fontWeight: 'bold',
          textAlign: 'left'
        },
        unit_text: {
          marginTop: '5%',
          color: '#fff',
          fontSize: 18,
          fontWeight: 'normal',
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
