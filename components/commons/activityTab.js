import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressCircle from './../commons/progressCircle'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class Activity_Tab extends Component {
    render() {
        return(
            <View style={this.props.type == 'box'? this.props.switch == 'left' ? styles.container_box : styles.container_box_right : styles.container}>
                <View style={styles.circle_row}>
                    <View style={{margin: 5}}>
                      <AnimatedCircularProgress
                        size={107}
                        width={12}
                        fill={this.props.percent}
                        lineCap='round'
                        tintColor="#2FDA54"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                        {
                          (fill) => (
                            <View style={styles.under_circle}>
                              <Text style={[styles.circle_head, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                               Total
                              </Text>
 
                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                Activity 300km
                              </Text>
                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Tokens 20
                              </Text>
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                    </View>
        
                    <View style={{margin: 5}}>
                      <AnimatedCircularProgress
                        size={107}
                        width={12}
                        fill={this.props.percent + 15}
                        lineCap='round'
                        tintColor="#2FDA54"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875" >
                          {
                          (fill) => (
                            <View style={styles.under_circle}>
                              <Text style={[styles.circle_head, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                               Total
                              </Text>
                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                Activity 300km
                              </Text>
                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Tokens 20
                              </Text>
                            </View>
                          )
                        }
                        </AnimatedCircularProgress>
                    </View>
        
                    <View style={{margin: 5}}>
                      <AnimatedCircularProgress
                          size={107}
                          width={12}
                          fill={this.props.percent - 20}
                          lineCap='round'
                          tintColor="#2FDA54"
                          onAnimationComplete={() => console.log('onAnimationComplete')}
                          backgroundColor="#3d5875" >
                            {
                          (fill) => (
                            <View style={styles.under_circle}>
                              <Text style={[styles.circle_head, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                               Total
                              </Text>
                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                Activity 300km
                              </Text>
                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Tokens 20
                              </Text>
                            </View>
                          )
                        }
                          </AnimatedCircularProgress>
                    </View>
               
                </View>
            </View>
            
          );
    }
}


const styles = StyleSheet.create({
  container_box: {
        flex: 1,
        backgroundColor: '#C5A0F4',
        elevation: 5,
        justifyContent: 'center',
       // alignItems: 'center',
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 0 }
  },
    container_box_right: {
      flex: 1,
      backgroundColor: '#1fcbbf',
      elevation: 5,
      justifyContent: 'center',
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
      height: 1,
      width: 0 }
    },
  container: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
     },
    inside_circle_row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  circle_row: {
    paddingTop: '6.5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  under_circle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle_head: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  circle_number: {
    fontSize: 11,
    fontWeight: 'bold'
  }
});

export default Activity_Tab;