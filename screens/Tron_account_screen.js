import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Clipboard, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import TronWeb from 'tronweb'
import * as config  from './../config/credentials'
const HttpProvider = TronWeb.providers.HttpProvider;

export default class Tron_account_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressDetails: {},
      showDetails: false,
      loading: false
    };
    this.fullNode =  new HttpProvider(config.fullNode);
    this.solidityNode = new HttpProvider(config.solidityNode);
    this.fullNode_test =  new HttpProvider(config.fullNode_test);
    this.solidityNode_test = new HttpProvider(config.solidityNode_test);
    this.privateKey = config.privateKey
    this.myaddress = config.myAddress
    this.tronWeb = new TronWeb(this.fullNode_test, this.solidityNode_test)
    this.tronWeb.setPrivateKey(this.privateKey)
    this.tronWeb.setAddress('41486C088A211DBE147DD91D70C3E51606C29FC34C');
  }

  static navigationOptions = {
    title: 'TRON wallet',
  };

  pasteAddress = async () => {
    let string = await Clipboard.getString()
    this.setState({address: string.trim()})
  }

  fetchTronAccount = () => {
    if(this.state.address == '') {
      alert('Please enter address')
    } else {
    this.setState({loading: true})
    let address = this.state.address
    this.tronWeb.trx.getAccount(address, (err, res) => {
      if(err) {
        this.setState({loading: false})
        alert('Something went wrong !')
      } else {
        this.setState({addressDetails: res, showDetails: true, loading: false}, () => {
          console.log('state', this.state.addressDetails);
        })
      }
    });
   }
  }

  cancleEntry = () => {
    this.setState({addressDetails: {}, showDetails: false, address: ''})
  }

  confirmEntry = () => {

  }

  render() {
    return (
      <View style={styles.main_container}>
      {this.state.showDetails &&
        <View>
        <View style={styles.details}>
          <View style={styles.details_container}>
            <View style={styles.head_details_text}>
              <Text style={styles.head_details_text}>Account Name</Text>
            </View>
            <View style={styles.value_text_view}>
            <Text style={styles.value_text}>{this.state.addressDetails.account_name == null ? 'No information' : this.state.addressDetails.account_name}</Text>
            </View>
          </View>

          <View style={styles.details_container}>
            <View >
              <Text style={styles.head_details_text}>Address (HEX)</Text>
            </View>
            <View style={styles.value_text_view}>
              <Text style={styles.value_text}>{this.state.addressDetails.address == null ? 'No information' : this.state.addressDetails.address}</Text>
            </View>
          </View>

          <View style={styles.details_container}>
            <View style={styles.head_details_text}>
              <Text style={styles.head_details_text}>Balance</Text>
            </View>
            <View style={styles.value_text_view}>
              <Text style={styles.value_text}>{this.state.addressDetails.balance == null ? 0 : this.state.addressDetails.balance / 1000000} TRX</Text>
            </View>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View>
              <TouchableOpacity style={styles.re_enter_btn} onPress={this.cancleEntry}>
                <Text style={{color: '#fff'}}>Cancle</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.confirm_btn}>
                <Text style={{color: '#fff'}}>Confirm</Text>
              </TouchableOpacity>
            </View>
        </View>
       </View>
      }
        {this.state.loading &&
          <ActivityIndicator style={{paddingTop: 100}} hidesWhenStopped={true} size="large" color="#c6a0f5"/>
        }
        
        <View style={styles.address_input}>
          <Text style={styles.head_text}> Please enter your address</Text>
          <Icon
            containerStyle={styles.paste_icon}
            name='paste'
            type='font-awesome'
            color='#000'
            onPress={this.pasteAddress} />
          <TextInput
            style={styles.input_field}
            onChangeText={(address) => this.setState({address})}
            placeholder="Please enter tron wallet address"
            value={this.state.address}
            editable={!this.state.showDetails}
            selectTextOnFocus={!this.state.showDetails}
          />
          <TouchableOpacity disabled={this.state.showDetails} style={styles.add_btn} onPress={this.fetchTronAccount}>
            <Text style={styles.btn_text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    address_input: {
      flex: 1,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    head_text: {
      color: '#000',
      textAlign: 'left',
      fontSize:16,
      fontWeight: 'bold',
      padding: 5
    },
    input_field: {
      borderColor: 'gray',
      borderWidth: 1,
      color: '#000',
      borderRadius: 10,
      width: '80%',
      padding: 10,
      paddingRight: 38,
      fontWeight: 'bold'
    },
    add_btn : {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#221f1f',
      width: '60%',
      borderRadius: 20
    },
    btn_text: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center'
    },
    paste_icon: {
      position: 'absolute',
      alignSelf: 'flex-end',
      paddingRight: 45,
      paddingBottom: 40,
      zIndex: 99
    },
    details_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10
    },
    details: {
      alignItems: 'center',
      padding: 10,
    },
    head_details_text: {

    },
    value_text_view: {
      padding: 5,
      width: '70%',
      borderWidth: 1,
      borderRadius: 10
    },
    value_text :{
      fontSize: 16,
      fontWeight: 'bold'
    },
    re_enter_btn: {
      padding: 10,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: '#C23631',
      borderRadius: 20
    },
    confirm_btn: {
      paddingLeft: 50,
      paddingRight: 50,
      padding: 10,
      backgroundColor: '#1fcbbf',
      borderRadius: 20
    }
})