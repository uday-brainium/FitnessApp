import React, { Component } from 'react';
import {
  View, 
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Platform
} from 'react-native';
import { Colors } from './../../config/theme'

class Calorie_tracker_tab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      background: '#fff'
    }
  } 

  componentDidMount() {
    this.setState({background: this.props.background})
  }

  render() {
    return (
         <View style={{ backgroundColor: this.props.background,
            elevation: 5,
            height: Platform.OS == 'ios' ? 180 : 200,
            borderRadius: 20,
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
            height: 1,
            width: 0 }
          }}>

          <Text style={
            this.props.type == 'white' ? styles.head_text : styles.head_text_colored
          }>{this.props.headText}</Text>
          <View style={styles.section}>

            <View style={styles.view_1}>
              <Image style={styles.icons}
                source={
                  this.props.type == 'white' ?
                  require('./../../assets/images/walkrun.png') :
                  require('./../../assets/images/walkrun2.png')
                }
                />
              <Text style={
                 this.props.type == 'white' ? styles.bottom_text : styles.bottom_text_color
                }>Walk/Run</Text>
              <Text style={
                this.props.type == 'white' ? styles.bottom_value_text : styles.bottom_value_text_color
              }>{this.props.walkValue}</Text>
            </View>

            <View style={styles.view_2}>
              <Image style={styles.icons}
                source={
                  this.props.type == 'white' ?
                  require('./../../assets/images/bike.png') :
                  require('./../../assets/images/bike2.png')
                }
               />
              <Text style={
                this.props.type == 'white' ? styles.bottom_text : styles.bottom_text_color
              }>Bike</Text>
              <Text style={
                this.props.type == 'white' ? styles.bottom_value_text : styles.bottom_value_text_color
              }>{this.props.bikeValue}</Text>
            </View>

            <View style={styles.view_3}>
              <Image style={styles.icons}
                source={
                  this.props.type == 'white' ?
                  require('./../../assets/images/racing.png') :
                  require('./../../assets/images/racing2.png')
                }
               />
              <Text style={
                this.props.type == 'white' ? styles.bottom_text : styles.bottom_text_color
              }>Vehicle</Text>
              <Text style={
                this.props.type == 'white' ? styles.bottom_value_text : styles.bottom_value_text_color
              }>{this.props.vehicleValue}</Text>
            </View>

          </View>

         </View>
    );
  }
}

const styles = StyleSheet.create({
      section: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      head_text: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'gray',
        paddingTop: 10
      },
      head_text_colored: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingTop: 10
      },
      icons: {
        width: '60%',
        height: 60,
        resizeMode:'contain'
      },
      view_1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%',
      },
      view_2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%',
      },
      view_3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%',
      },
      bottom_text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'normal',
        color: 'gray',
        paddingTop: 5
      },
      bottom_text_color: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'normal',
        color: '#ffffff',
        paddingTop: 5
      },
      bottom_value_text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
        color: 'gray',
      },
      bottom_value_text_color: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
        color: '#ffffff',
      }
    })

export default Calorie_tracker_tab;
