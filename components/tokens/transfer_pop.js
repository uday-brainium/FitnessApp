import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import CloseIcon from './../../assets/images/menu_close.png'

export default class Transfer_pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  goToWallet =() => {
    this.props.close()
    const { state, navigate } = this.props.nav;
    navigate('tron_wallet', { go_back_key: state.key });
  }
  CreateWallet= () => {
    this.props.close()
    const { state, navigate } = this.props.nav;
    navigate('new_tron_wallet', { go_back_key: state.key });
  }

  render() {
    return (
      <View>
       <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.showAlert}
          onRequestClose={() => {
             this.props.close()
          }}>
         <View style={{backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
           <View style={styles.popup_screen}>
              <View style={styles.main_view}>
                <Image source={{uri: 'https://tronscan.org/static/media/tron-banner-1.e40b3379.png'}}
                style={{height: 45, width: '50%'}}
                resizeMode='cover'
                />

                <View style={styles.text_view}>
                  <Text>
                    You must have an TRAN Wallet account to transfer TOKENS.
                    if you already have an TRON wallet account click on enter wallet address or 
                    Create a new wallet on TRON network.
                  </Text>
                </View>

              </View>
              <View style={styles.button_row}>
                <View style={styles.btn_view}>
                  <TouchableOpacity style={styles.subscribe_btn} onPress={this.goToWallet}>
                    <Text style={styles.btn_text}>Already have TRON wallet</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={this.CreateWallet} style={styles.subscribe_btn}>
                    <Text style={styles.btn_text}>Create new TRON wallet</Text>
                  </TouchableOpacity>
                </View>
              </View>
           </View>
         </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup_screen: {
    width: '90%',
    height: 300,
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
  main_view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_view: {
    padding: 10,
  },
  button_row: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subscribe_btn: {
    paddingBottom: 10,
    borderRadius: 50,
    backgroundColor: '#221f1f',
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
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center'
  },
  btn_view: {
    paddingBottom: 10
  }
})