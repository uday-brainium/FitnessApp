import React , { Component } from 'react'
import {View, Text, Image, BackHandler, ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import gstyle from './../commons/styles'
import { Container, Header, Content, ListItem, CheckBox, Body } from 'native-base';
import { Colors } from './../../config/theme'


class Terms_condition extends Component {

    constructor(props) {
      super(props) 
        this.state = {
          checked: false,
          color: 'gray'
        }
    }

    onCheckPress = () => {
      this.setState({checked: !this.state.checked})
      if(this.state.checked) {
        this.setState({color: 'green'})
      } else {
        this.setState({color: 'green'})
      }
    }

    
    render() {
        return(
          <View style={gstyle.page_container}>
            <View >
                <ImageBackground 
                 source={require('./../../assets/images/Up_bg.png')}
                 style={styles.img_bg}
                >

                <View style={styles.container}>
                  <Text style={styles.head_text}>
                    Terms & Conditions
                  </Text>
                  <View style={{height: 250}}>
                    <ScrollView style={{height: '100%', width: '120%', paddingLeft:'17%', paddingBottom: 10 }}>
                     <Text style={styles.description_text}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, 
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, 
                      </Text>
                    </ScrollView>
                    
                  </View>
                  <View style={{flex:1, marginLeft: '9%', marginTop: '10%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <View style={{margin: 10}}>
                      <CheckBox onPress={this.onCheckPress} checked={this.state.checked} color={this.state.color}/>
                      <Text></Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text>I understand and agree to these Terms & conditions</Text>
                    </View>
                  </View>

                </View>

                <View style={styles.button_view}>
                    <TouchableOpacity disabled={!this.state.checked} onPress={this.onProccedTouch} style={ this.state.checked ? styles.procced_button : styles.procced_button_disabled }>
                      <Text style={styles.procced_button_text}>
                          Continue
                      </Text>
                     </TouchableOpacity>
                  </View>
                
                  <ImageBackground 
                    source={require('./../../assets/images/Group402.png')}
                    style={{width: 90, height: 90, top: '12%', left: '10%', position: 'absolute'}}
                    >
                  </ImageBackground>
                 
                </ImageBackground>

            </View>
            
          </View>
        )
    }
} 

const styles = StyleSheet.create({
   container: {
     flex:1, 
     width: '80%',
     alignItems:'center',
     paddingTop: '30%',
    },
    img_bg : {
       width: Dimensions.get('window').width,
       height: Dimensions.get('window').height,
    },
    head_text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'left',
      paddingBottom: '10%',
      marginLeft: '6%'
    },
    description_text: {
      fontSize: 16,
      color: 'gray',
      textAlign: 'left',
    },   
    procced_button: {
      width: '80%',
      backgroundColor: Colors.green,
      padding: 15,
      borderRadius: 50,
    },
    procced_button_disabled: {
      width: '80%',
      backgroundColor: 'gray',
      padding: 15,
      borderRadius: 50,
    },
  procced_button_text: {
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#ffffff',
  },
  button_view: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      width: '95%',
      //paddingTop: '25%',
  }
})

export default Terms_condition