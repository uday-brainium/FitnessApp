import React, { Component } from 'react';
import { View, Alert, Text, Modal, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import * as tronApi from './../../config/Tron'
import Transfer_loader from './../commons/transfer_loader'
import Apis from '../../actions/common_action';


export default class Transfer_pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transfering: false,
    };
  }

  //Navigate to wallet addition page
  goToWallet =() => {
    this.props.close()
    const { state, navigate } = this.props.nav;
    navigate('tron_wallet', { go_back_key: state.key });
  }

  //Currently no use of this
  CreateWallet= () => {
    this.props.close()
    const { state, navigate } = this.props.nav;
    navigate('new_tron_wallet', { go_back_key: state.key });
  }

  //Directly send the tokens to saved wallet
  chooseWallet = () => {
    this.setState({transfering: true})
    let toAddress = this.props.wallet
    let initialTokens = (this.props.tokens)

    //Backend validation for token transfer
    Apis.validate_transfer({userid: this.props.userid, added_tokens: initialTokens})
    .then(res => res.json())
    .then(response => {
      if(response.status != 200) {
        this.setState({transfering: false})
        Alert.alert('Unable to validate', 'It seems its a security breach please try again with valid amount')
      } else {
        tronApi.sendToken(toAddress, initialTokens, this.props.userid)
        .then(res => {
          this.setState({transfering: false})
          this.props.close()
          Alert.alert('Successfull', 'Tokens has been transfered to your wallet successfully.')
        }, err => {
          this.setState({transfering: false})
          Alert.alert('Error', err)
        })
      }
    })
  }

  render() {
    return (
      <View>
       <Transfer_loader isLoading={this.state.transfering}/>
       <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.showAlert}
          onRequestClose={() => {
             this.props.close()
          }}>
         <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
           <View style={styles.popup_screen}>
              <View style={styles.main_view}>
                <Image source={{uri: 'https://tronscan.org/static/media/tron-banner-1.e40b3379.png'}}
                style={{height: 45, width: '50%'}}
                resizeMode='cover'
                />

                {this.props.wallet == '' || this.props.wallet == null ?
                  <View style={styles.text_view}>
                   <Text>
                    You must have a TRON wallet account as stated in &quot;GET STARTED&quot;.
                    Click on &quot;Add TRON wallet address&quot; so 500 TRAN tokens will be rewarded.
                    Thank you for donating $10AUD to TRAN Systems.
                    Building an ecosystem system takes resources and time.
                   </Text>
                 </View> : 
                 <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
                  {this.props.tokens} TRAN
                 </Text>
                }
              
              </View>
              <View style={styles.button_row}>
              {this.props.wallet != '' && this.props.wallet != null && 
                <View style={styles.btn_view}> 
                  <Text style={styles.saved_wallet_text}>Default TRON wallet address shown below</Text>
                  <Text style={styles.wallet_address_text}>{this.props.wallet}</Text>
                  <TouchableOpacity onPress={this.chooseWallet} style={styles.subscribe_btn}>
                    <Text style={styles.btn_text}>Send</Text>
                  </TouchableOpacity>
               </View> }

                <View style={{padding: 10}}>
                  {this.props.wallet !== '' && this.props.wallet != null ?
                  <View>
                    <Text style={styles.or_text}>OR</Text>
                    <TouchableOpacity style={styles.subscribe_btn} onPress={this.goToWallet}>
                      <Text style={styles.btn_text}>Change wallet addres</Text>
                    </TouchableOpacity>
                  </View>
                     :
                  <View style={{marginTop: 20}}>
                    <TouchableOpacity style={styles.subscribe_btn} onPress={this.goToWallet}>
                      <Text style={styles.btn_text}>Add TRON wallet address</Text>
                    </TouchableOpacity>
                  </View>
                    }
                  {/* {this.state.wallet  !== '' && this.state.wallet != null ?
                    <TouchableOpacity style={styles.subscribe_btn} onPress={this.goToWallet}>
                      <Text style={styles.btn_text}>Change TRON wallet addres</Text>
                    </TouchableOpacity> : 
                    <TouchableOpacity style={styles.subscribe_btn} onPress={this.goToWallet}>
                      <Text style={styles.btn_text}>Add TRON wallet address</Text>
                    </TouchableOpacity>
                  } */}
                  
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
    height: 350,
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
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10
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
    fontSize: 14,
    textAlign: 'center'
  },

  saved_wallet_text : {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  },
  wallet_address_text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  or_text: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  btn_view: {
    paddingBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 0
  }
})