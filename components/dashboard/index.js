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
  Image,
  ActivityIndicator
} from 'react-native';
import { Colors } from './../../config/theme'
import PureChart from 'react-native-pure-chart'
import {design} from './../../config/stylsheet'
import { Icon } from 'react-native-elements'
import Activity_list  from './../commons/activity_list'
import Activity_list_daily from './../commons/Activity_list_daily'
import {tokenRateVehicle, tokenRateBike, tokenRateWalking, calorieRate, calorieBurnt} from './../../config/appConstants'
import Activity_list_weekly from '../commons/activity_list_weekly';

let sampleData
let imagePath = './../../assets/images/'

class Activity_tracker extends Component {
  constructor(props){
    super(props)
    this.state = {
      chartLoading :true
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.chartData != null && this.props.chartData != nextProps.chartData){
       this.setState({chartLoading: false})
       sampleData = [
        { seriesName: 'Months',
          data: nextProps.chartData.dataObjCalorie,
          color: 'violet'
        },
        {
          seriesName: 'Tokens',
          data: nextProps.chartData.dataObjToken,
          color: 'green'
        }
      ]
    }
  }

  render() {
    const {distance, walkrunDistance, bikeDistance, vehicleDistance} = this.props

    let walkDistanceText = walkrunDistance < 1 ? `${(walkrunDistance * 1000).toFixed(1)} m` : `${(walkrunDistance).toFixed(2)} km`
    let bikeDistanceText = bikeDistance < 1 ? `${(bikeDistance * 1000).toFixed(1)} m` : `${(bikeDistance).toFixed(2)} km`
    let vehicleDistanceText = vehicleDistance < 1 ? `${(vehicleDistance * 1000).toFixed(1)} m` : `${(vehicleDistance).toFixed(2)} km`
    let totalDistanceText = distance < 1 ? `${(distance * 1000).toFixed(1)} m` : `${(distance).toFixed(2)} km`
   
    let walkingTokens = ((walkrunDistance * 1000) * tokenRateWalking).toFixed(4)
    let cycleTokens = ((bikeDistance * 1000) * tokenRateBike).toFixed(4)
    let vehicleTokens = ((vehicleDistance * 1000) * tokenRateVehicle).toFixed(4)

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
                       (calorieBurnt('walkrun', this.props.walkingTime, this.props.userWeight).toFixed(2)) :
                      this.props.trackingType === 'bycycle' ?
                       (calorieBurnt('bycycle', this.props.bikeTime, this.props.userWeight).toFixed(2)) :
                      this.props.trackingType === 'vehicle' ?
                       (calorieBurnt('vehicle', this.props.vehicleTime, this.props.userWeight).toFixed(2)) :
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
                <Text style={styles.unit_head_text}>{(this.props.speed).toFixed(2)} m/s</Text>
              </View>
              </View>
            </Animated.View>
           </ImageBackground>

          {/* On / Off Round buttons */}
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
            
          {/* Daily activity list/data */}
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
                <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Daily activity</Text>
              </View>
              </View>
               <Activity_list_daily/>
             </View>

          </View>
          
          {/* Activity list Weekly[ Written monthly cause before it was monthly ] */}
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
               <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Weekly activity</Text>
             </View>
            </View>
            <Activity_list_weekly
              updateData = {this.props.startedTracking}
            />
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
               <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Overall activity</Text>
             </View>
            </View>
            <Activity_list 
              updateData = {this.props.startedTracking}
            />
          </View>
          
          {/* All year data in line graph chart */}
           <View style={styles.barchart_view}>
              <View style={{marginLeft: 5, marginRight: -15}}>
                  <Icon
                  name='timeline'
                  type='MaterialIcons'
                  color='#c6a0f5'
                  size = {22}
                />
              </View>
            
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Text style={styles.barChart_left_text}>Monthly Overview</Text>
              </View>

              <View>
                <View style={{flex:0.1, flexDirection: 'row'}}>
                  <View style={{ margin: 5}}>
                    <View style={{flex:1, flexDirection: 'row',}}>
                      <View style={{width: 15, height: 15, backgroundColor: 'violet', borderRadius: 5, marginTop: 3}}></View>
                      <View><Text style={styles.barChart_text}>Calories</Text></View>
                    </View>
                  </View>
                  <View style={{margin: 5}}>
                  <View style={{flex:1, flexDirection: 'row',}}>
                    <View style={{width: 15, height: 15, backgroundColor: 'green', borderRadius: 5, marginTop: 3}}></View>
                    <View><Text style={styles.barChart_text}>Tokens</Text></View>
                   </View>
                  </View>
                </View>
              </View>
           </View>


            <View style={styles.chartContainer}>
            {this.state.chartLoading &&
               <ActivityIndicator size="large" color="gray" />
            }
            {!this.state.chartLoading &&
             <PureChart data={sampleData} type='bar' />
            }
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
         marginTop: 10,
         marginLeft: 15,
         marginRight: 30,
          // flex:1,
          height: 200,
        //  padding: '5%',
          width: '90%',
  
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
