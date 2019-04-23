import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Clipboard, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import TronWeb from 'tronweb'
import * as config  from './../config/credentials'
const HttpProvider = TronWeb.providers.HttpProvider;

export default class Create_new_wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    title: 'Create TRON wallet',
	};
	
	componentDidMount() {
		this.setState({addressDetails: ''})
	}

  createTronAccount = () => {
		this.setState({loading: true})

    this.tronWeb.createAccount((err, res) => {
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


  confirmEntry = () => {
		this.props.navigation.navigate('Token_transfer')
  }

  render() {
    return (
      <View style={styles.main_container}>
      {this.state.showDetails &&
        <View>
        <View style={styles.details}>
          <View style={styles.details_container}>
            <View style={styles.head_details_text}>
              <Text style={styles.head_details_text}>Address (Base58)</Text>
            </View>
            <View style={styles.value_text_view}>
            <Text style={styles.value_text}>{this.state.addressDetails.address.base58}</Text>
            </View>
          </View>

          <View style={styles.details_container}>
            <View style={styles.head_details_text}>
              <Text style={styles.head_details_text}>Address (HEX)</Text>
            </View>
            <View style={styles.value_text_view}>
            <Text style={styles.value_text}>{this.state.addressDetails.address.hex}</Text>
            </View>
          </View>

          <View style={styles.details_container}>
            <View >
              <Text style={styles.head_details_text}>Privet key (HEX)</Text>
            </View>
            <View style={styles.value_text_view}>
              <Text style={styles.value_text}>{this.state.addressDetails.privateKey}</Text>
            </View>
          </View>

          <View style={styles.details_container}>
            <View style={styles.head_details_text}>
              <Text style={styles.head_details_text}>Public key</Text>
            </View>
            <View style={styles.value_text_view}>
              <Text style={styles.value_text}>{this.state.addressDetails.publicKey}</Text>
            </View>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View>
              <TouchableOpacity onPress={this.confirmEntry} style={styles.confirm_btn}>
                <Text style={{color: '#fff'}}>Save this account</Text>
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
						<TouchableOpacity disabled={this.state.showDetails} style={styles.add_btn} onPress={this.createTronAccount}>
								<Text style={styles.btn_text}>Create new TRON wallet</Text>
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
      backgroundColor: '#1fcbbf',
      borderRadius: 20
    }
})