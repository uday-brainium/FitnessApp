import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { get_overall_activity } from './../../actions/Activity_action'
let ls = require('react-native-local-storage');

let overallWalkDistance = 0
let overallWalkCalorie = 0
let overallWalkToken = 0
let overallBikeDistance = 0
let overallBikeCalorie= 0
let overallBikeToken= 0
let overallVehicleDistance= 0
let overallVehicleCalorie= 0
let overallVehicleToken= 0


 class Activity_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }

  componentDidMount() {
    ls.get('userdata').then((data) => {
      let data1 = JSON.parse(data)
      let userId = data1._id
      this.props.get_overall_activity(userId)
    })
  }

  componentWillReceiveProps(nextProps) {
    //Setting the values to initial lable
    overallWalkDistance = 0,overallWalkCalorie = 0,overallWalkToken = 0,
    overallBikeCalorie = 0, overallBikeToken = 0, overallVehicleDistance = 0
    overallVehicleCalorie = 0, overallVehicleToken = 0, overallBikeDistance = 0
    if(nextProps){
      //re-render component
     
      let data = nextProps.all_activity.overall_activity
      for(var i = 0; i < data.length; i++ ){
        overallWalkDistance +=  parseInt(data[i].walkingdistance)
        overallWalkCalorie +=  parseInt(data[i].walkingcalories)
        overallWalkToken +=  parseInt(data[i].walkingtokens)
        overallBikeDistance += parseInt(data[i].bikedistance)
        overallBikeCalorie +=  parseInt(data[i].bikecalories)
        overallBikeToken += parseInt(data[i].biketokens)
        overallVehicleDistance += parseInt(data[i].vehicledistance)
        overallVehicleCalorie += parseInt(data[i].vehiclecalories)
        overallVehicleToken +=  parseInt(data[i].vehicletokens)
      }
    }
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
          <View>  
            <Text style={styles.history_head_text}>Walking</Text>
            <Text style={styles.history_value_text}>D {
              overallWalkDistance > 999 ?
               `${(overallWalkDistance / 1000).toFixed(2)} km` :
               `${(overallWalkDistance).toFixed(2)} m`
            }</Text>
            <Text style={styles.history_value_text}>C {overallWalkCalorie} kj</Text>
            <Text style={styles.history_value_text}>T {overallWalkToken}</Text>
          </View>
          <View>
            <Text style={styles.history_head_text}>Cycling</Text>
            <Text style={styles.history_value_text}>
            D {
              overallBikeDistance > 999 ?
               `${(overallBikeDistance / 1000).toFixed(2)} Km` :
               `${(overallBikeDistance).toFixed(2)} m`
            }
            </Text>
            <Text style={styles.history_value_text}>C {overallBikeCalorie} kj</Text>
            <Text style={styles.history_value_text}>T {overallBikeToken}</Text>
          </View>
          <View>
            <Text style={styles.history_head_text}>Vehicle</Text>
            <Text style={styles.history_value_text}>
            D {
              overallVehicleDistance > 999 ?
               `${(overallVehicleDistance / 1000).toFixed(2)} km` :
               `${(overallVehicleDistance).toFixed(2)} m`
            }
            </Text>
            <Text style={styles.history_value_text}>C {overallVehicleCalorie} kj</Text>
            <Text style={styles.history_value_text}>T {overallVehicleToken}</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return{
    all_activity: state.overallActivity
  }
}

export default connect(mapStateToProps, {get_overall_activity})(Activity_list)

const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 2,
      borderBottomColor: '#1fcbbf',
      marginLeft: -3,
      paddingBottom: 20,
    },
    history_head_text: {
      fontSize: 18,
      paddingBottom: 10,
      fontWeight: 'bold'
    },
    history_value_text: {
      fontSize: 15,

    }
})