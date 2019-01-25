import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ProgressCircle from './../commons/progressCircle'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {design} from './../../config/stylsheet'


class Activity_Tab extends Component {
    render() {
        return(
            <View style={this.props.type == 'box'? this.props.switch == 'left' ? styles.container_box : styles.container_box_right : styles.container}>
                {/* <Text style={design.med_center_text}>{this.props.headText}</Text> */}
                <View style={styles.circle_row}>
                    <View style={{opacity: this.props.activeCircle == 'WALKING' || this.props.activeCircle == 'RUNNING' ? 1 : 0.3, margin: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <AnimatedCircularProgress
                        size={100}
                        width={10}
                        fill={this.props.percent + 2}
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
                                 Activity 350 m
                              </Text>

                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Calorie 20
                              </Text>

                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                Token 10
                              </Text>
                              
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>

                      <Image style={styles.icons}
                          source={
                            this.props.type == 'normal' ?
                            require('./../../assets/images/walkrun.png') :
                            require('./../../assets/images/walkrun2.png')
                          }
                        />
                    </View>
        
                    <View style={{ opacity: this.props.activeCircle == 'ON_BICYCLE' ? 1 : 0.3,margin: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <AnimatedCircularProgress
                        size={100}
                        width={10}
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
                                 Activity 390 m
                              </Text>

                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Calorie 15
                              </Text>

                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Token 12
                              </Text>
                              
                            </View>
                          )
                        }
                        </AnimatedCircularProgress>

                        <Image style={styles.icons}
                          source={
                            this.props.type == 'normal' ?
                            require('./../../assets/images/bike.png') :
                            require('./../../assets/images/bike2.png')
                          }
                        />
                    </View>
        
                    <View style={{opacity: this.props.activeCircle == 'IN_VEHICLE' ? 1 : 0.3, margin: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <AnimatedCircularProgress
                          size={100}
                          width={10}
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
                                 Activity 550 m
                              </Text>

                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Calorie 25
                              </Text>

                              <Text style={[styles.circle_number, this.props.type == 'box' ? {color: '#fff'} : {color: 'gray'}]}>
                                 Token 10
                              </Text>
                              
                            </View>
                          )
                        }
                          </AnimatedCircularProgress>
                        <Image style={styles.icons}
                          source={
                            this.props.type == 'normal' ?
                            require('./../../assets/images/racing.png') :
                            require('./../../assets/images/racing2.png')
                          }
                        />
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
    paddingTop: '4%',
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
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  circle_number: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'normal'
  },
  icons: {
    marginTop: 5,
    marginLeft: -5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 60,
    resizeMode:'contain'
  }
});

export default Activity_Tab;