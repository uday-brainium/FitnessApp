import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TextInput, TouchableOpacity, Clipboard, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import Apis from './../actions/common_action'
let ls = require('react-native-local-storage');
import * as tronApi from './../config/Tron'
import Transfer_loader from './../components/commons/transfer_loader'
import * as theme from './../config/theme'

export default class Tron_account_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      address: '',
      shaAdd: '',
      addressDetails: {},
      showDetails: false,
      loading: false,
      transfering: false,
      token_issued: false
    };
  }

  static navigationOptions = {
    title: 'TRON wallet',
  };

 componentDidMount() {
    this.setState({loading: true})
    ls.get('userdata').then((data) => {
      let userid = JSON.parse(data)._id
      Apis.get_user(userid)
      .then(res => res.json())
      .then((response) => {
        this.setState({userid, token_issued: response.response.token_issued, loading: false})
      })
    })
  }
 
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
    //Fetching info from address
    tronApi.getAddress(address).then(res => {
      if(res.address) {
        this.setState({addressDetails: res, shaAdd: address, showDetails: true, loading: false})
      } else {
        Alert.alert('Could not fetch address details')
      }
    }, err => {
      this.setState({loading: false})
      Alert.alert(err)
    }) 
   }
  }

  cancleEntry = () => {
    this.setState({addressDetails: {}, showDetails: false, address: ''})
  }

  confirmEntry = () => {
    this.setState({loading: true, showDetails: false})
    let {address} = this.state.addressDetails
    let data = {
      userid: this.state.userid,
      address: this.state.shaAdd
    }
    Apis.saveWallet(data)
    .then(res => res.json())
    .then((response) => {
      //Sending initial Tokens
      if(!this.state.token_issued) {
        this.setState({transfering: true})
        //Params are address, tokens, userid, if first transaction true or false
        tronApi.sendToken(address, 500, this.state.userid, true).then(res => {
          this.setState({loading: false, transfering: false})
          Alert.alert('Transfer successfull', '500 TRAN transfered & Tron wallet added to your account tokens will be transfered to this wallet.')
          this.props.navigation.navigate('Token_transfer')
        }, err => {
          this.setState({loading: false, transfering: false})
          Alert.alert('Error', err)
        })
      } else {
        Alert.alert('Wallet added', 'Tron wallet added to your account tokens will be transfered to this wallet.')
        this.props.navigation.navigate('Token_transfer')
      }
    })
  }
  

  render() {

    return (
      <View style={styles.main_container}>
      <Transfer_loader isLoading={this.state.transfering} />
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
                <Text style={{color: '#fff'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={this.confirmEntry} style={styles.confirm_btn}>
                <Text style={{color: '#fff'}}>Confirm</Text>
              </TouchableOpacity>
            </View>
        </View>
       </View>
      }
        {this.state.loading &&
          <ActivityIndicator style={{paddingTop: 100}} hidesWhenStopped={true} size="large" color="#c6a0f5"/>
        }
        
       {!this.state.showDetails &&
        <View style={styles.address_input}>
          <Text style={styles.head_text}> Preferred TRON wallet address</Text>
          <Icon
            containerStyle={styles.paste_icon}
            name='paste'
            type='font-awesome'
            color='#000'
            onPress={this.pasteAddress} />
          <TextInput
            style={styles.input_field}
            onChangeText={(address) => this.setState({address})}
            placeholder="TRON wallet address ONLY"
            value={this.state.address}
            editable={!this.state.showDetails}
            selectTextOnFocus={!this.state.showDetails}
          />
          <TouchableOpacity disabled={this.state.showDetails} style={styles.add_btn} onPress={this.fetchTronAccount}>
            <Text style={styles.btn_text}>Update</Text>
          </TouchableOpacity>
        </View>
       }
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
      backgroundColor: theme.Colors.green,
      borderRadius: 20
    }
})