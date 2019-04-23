import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import CloseIcon from './../../assets/images/menu_close.png'

export default class Alert_modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  subscribe_screen = () => {
    this.props.nav.navigate('subscription_screen')
    this.props.close()
  }

  render() {
    return (
  
       <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.showAlert}
          onRequestClose={() => {
            console.log('request to close');
          }}>
         <View style={{backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
           <View style={styles.popup_screen}>
              <View>
                <Text style={styles.alert_text}>
                  This feature will be enabled once you subscribe.
                  You will then be able to transfer your token to TRON wallet.
                </Text>
              </View>
              <View style={styles.button_row}>
                <View>
                  <TouchableOpacity onPress={this.subscribe_screen} style={styles.subscribe_btn}>
                    <Text style={styles.btn_text}>Subscribe</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity style={{height: 60, width: 60}} onPress={this.props.close}>
                    <Image source={CloseIcon} style={{height: 50, width: 50}} />
                  </TouchableOpacity>
                </View>
              </View>
           </View>
         </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popup_screen: {
    width: '90%',
    height: 162,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
    height: 1,
    width: 0
    },
    elevation: 10
  },
  alert_text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
    fontWeight: 'bold',
    padding: 10
  },
  button_row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subscribe_btn: {
    //padding: 10,
    borderRadius: 50,
    backgroundColor: '#2f9c0a',
    paddingLeft: 55,
    paddingRight: 55,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
    height: 1,
    width: 0
    },
  },
  btn_text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})