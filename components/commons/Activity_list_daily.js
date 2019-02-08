import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import { get_activity_today } from './../../actions/Activity_action'
import { get_overall_activity } from './../../actions/Activity_action'
let ls = require('react-native-local-storage');

class Daily_Activity_list extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activityData: {}
      };
    }


    componentDidMount() {
      ls.get('userdata').then((data) => {
        let data1 = JSON.parse(data)
        let userId = data1._id
        this.props.get_activity_today(userId)
      })
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps) {
        this.setState({activityData: nextProps.activity.activity_result})
      }
    }
  
    render() {
      
      
      return ( 
        <View style={styles.container_daily}>
          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <View>  
              <Text style={styles.history_value_text}>Distance (D)</Text>
              <Text style={styles.history_value_text}>
                {typeof this.props.activity.activity_result != 'undefined' ? 
                 this.props.activity.activity_result.totaldistance != null ?
                  this.props.activity.activity_result.totaldistance > 999 ? 
                   `${(this.props.activity.activity_result.totaldistance / 1000).toFixed(2)} km` :
                   `${(this.props.activity.activity_result.totaldistance).toFixed(2)} m`:
                  '0' 
                  : '0'}
              </Text>
            </View>
            <View>
              <Text style={styles.history_value_text}>Calorie (C)</Text>
              <Text style={styles.history_value_text}>{typeof this.props.activity.activity_result != 'undefined' ? this.props.activity.activity_result.totalcalories != null ? `${this.props.activity.activity_result.totalcalories} kj` : '0 kj' : '0'}</Text>
            </View>
            <View>
              <Text style={styles.history_value_text}>Token (T)</Text>
              <Text style={styles.history_value_text}>{typeof this.props.activity.activity_result != 'undefined' ? this.props.activity.activity_result.totaltokens != null ? this.props.activity.activity_result.totaltokens : '0' : '0'}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
  

function mapStateToProps(state) {
    return{
      activity: state.activityData,
    }
  }
  
  export default connect(mapStateToProps, {get_activity_today, get_overall_activity})(Daily_Activity_list)
  
  const styles = StyleSheet.create({
      container_daily: {
        padding: 10,
        paddingBottom: 0,
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