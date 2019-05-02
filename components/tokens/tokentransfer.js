import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Platform, Dimensions, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Animated, Keyboard, UIManager } from 'react-native'
import { Colors } from '../../config/theme';
import { Item, Input } from 'native-base';
import { connect } from 'react-redux'
import { check_subscription } from '../../actions/payment_action'
import Alert_modal from './alert_modal'
import Transfer_pop from './transfer_pop'
const ls = require('react-native-local-storage')
import Loader from './../../components/commons/Loader'
import Apis from '../../actions/common_action';

let totalDistance = 0
let totalTokens = 0

class TokenTransfer extends Component {
  constructor(props) {
    super(props);
    global.Buffer = global.Buffer || require("buffer").Buffer
    this.state = {
      userid: '',
      deductedTokens: 0,
      totalTokens: 0,
      tokenField: '',
      modalVisible: false,
      showAlert: false,
      showPop: false,
      loading: true,
      is_subscribed: false,
      tokenErr: false,
      fieldErr: false,
      wallet: '',
      componentLoader: true,
      inputErr: false
    }
    this.check_subscribed()
  }

  check_subscribed = () => {
    ls.get('userdata').then((data) => {
      let userid = JSON.parse(data)._id
      this.setState({userid})
      this.props.check_subscription(userid).then(() => {
        // this.setState({ loading: false })
        Apis.get_user(userid)
        .then(res => res.json())
        .then((response) => {
          this.setState({wallet: response.response.wallet}, () => {
           // this.setState({componentLoader: false})
            Apis.get_debited_tokens(userid).then((res) => res.json())
            .then((response) => {
              this.setState({
                deductedTokens: response.response,
                loading: false,
                componentLoader: false
              })
            })
          })
        })
      })
    })
  }

  componentDidMount() {
    //RE-rendering after pressing back
    this.props.nav.addListener(
      'willFocus',
      () => {
          this.check_subscribed()
      }
   )  
    this.check_subscribed()
    totalDistance = 0
    totalTokens = 0
    let data = this.props.data.overall_activity
    for (let i = 0; i < data.length; i++) {
      totalDistance = totalDistance + data[i].totaldistance
      totalTokens = totalTokens + data[i].totaltokens
      this.state.totalTokens += data[i].totaltokens
    }
    this.setState({ loading: false })
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (!nextProps.subscribed.is_subscribed) {
        this.setState({ loading: false })
      } else {
        this.setState({ loading: false, is_subscribed: true })
      }
    }
  }

  inputChange = (val) => {
    let tokenLeft = Math.round(this.state.totalTokens) - this.state.deductedTokens
    this.setState({ tokenField: val, fieldErr: false })
    if (Math.round(tokenLeft) < val || val == 0 || Math.sign(val) == -1) {
      this.setState({tokenErr: true})
    } else {
       this.setState({tokenErr: false, inputErr: false})
    }

  }

  onTransferTouch = () => {
    if (this.state.is_subscribed) {
      if(this.state.tokenField == '' && this.state.wallet != '') {
        this.setState({fieldErr: true})
      } else {
        this.setState({ showPop: true, fieldErr: false })
      }  
    } else {
      this.setState({ showAlert: true })
    }
  }

  componentWillUnmount() {
    this.setState({ showAlert: false, showPop: false })
  }

  closeAlert = () => {
    this.setState({ showAlert: false})
  }
  closePop = () => {
    this.setState({ showPop: false }, () => {
      this.check_subscribed()
    })
  }

  navigateToHistory = () => {
    this.props.nav.navigate('Transfer_history', {
      leftToken: (this.state.totalTokens - this.state.deductedTokens)
    })
  }

  
  render() {
    const tokensLeft = (this.state.totalTokens - this.state.deductedTokens)
    const { componentLoader } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.box_row}>
          <View style={styles.box} >
            <Text style={styles.head_text}>Total Distance</Text>
            <Image style={styles.icons2} source={require('./../../assets/images/distance.png')} />
            <Text style={styles.count_text}>{totalDistance > 999 ? `${(totalDistance / 1000).toFixed(2)} km` : `${totalDistance.toFixed(2)} m`}</Text>
          </View>
      
          <View style={styles.box} >
            <Text style={styles.head_text}>Total Token</Text>
            <Image style={styles.icons} source={require('./../../assets/images/Tokens.png')} />
            <Text style={styles.count_text}>{componentLoader ? '...' : tokensLeft.toFixed(4)}</Text>
          </View>

        </View>
        <Loader loading={this.state.loading} />
        <KeyboardAvoidingView style={styles.bottom_view} behavior="padding" enabled>
          <View style={styles.input_view}>
            <Text style={styles.bottom_text}>How many tokens you want to transfer to your TRON wallet ?</Text>

            <Item style={styles.token_input_container}>
              <Input  onChangeText={(text) => this.inputChange(text)} keyboardType="phone-pad" style={styles.token_input} placeholder='Tokens' />
            </Item>
           {this.state.tokenErr && <Text style={styles.errText}>You don't have enough tokens.</Text> }
           {this.state.fieldErr && <Text style={styles.errText}>Please enter token value.</Text> }
          </View>
        </KeyboardAvoidingView>
        
        {!this.state.componentLoader || Math.sign((this.state.totalTokens - this.state.deductedTokens) != -1)?
          this.state.wallet === '' && this.state.is_subscribed === true ?
        <View style={styles.button_view}>
          <TouchableOpacity disabled={this.state.tokenErr} onPress={this.onTransferTouch} style={styles.add_wallet_btn}>
            <Text style={styles.procced_button_text}>
              Add TRON wallet
            </Text>
          </TouchableOpacity>
        </View> : 
        this.state.wallet === '' || this.state.wallet === null && this.state.is_subscribed === false ?
        <View style={styles.button_view}>
          <TouchableOpacity disabled={this.state.tokenErr} onPress={this.onTransferTouch} style={styles.procced_button}>
           <Text style={styles.procced_button_text}>
            Procced
           </Text>
          </TouchableOpacity>
        </View> :
        this.state.wallet !== '' && this.state.is_subscribed === true ?
        <View style={styles.button_view}>
          <TouchableOpacity disabled={this.state.tokenErr || this.state.inputErr} onPress={this.onTransferTouch} style={styles.procced_button}>
           <Text style={styles.procced_button_text}>
            Procced
           </Text>
          </TouchableOpacity>
        </View> : <View></View> :
        <View>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      }
        <Alert_modal showAlert={this.state.showAlert} nav={this.props.nav} close={this.closeAlert} />
        <Transfer_pop userid={this.state.userid} tokens={this.state.tokenField} wallet={this.state.wallet} showAlert={this.state.showPop} nav={this.props.nav} close={this.closePop} />
      </View>

    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.overallActivity,
    subscribed: state.is_subscribed
  }
}

export default connect(mapStateToProps, { check_subscription })(TokenTransfer)



const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: Colors.background,
  },
  history_text: {
    fontSize: 16,
    padding: 10,
    color: Colors.green
  },
  box_row: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '10%',
    paddingTop: '5%'
  },
  box: {
    width: '45%',
    height: Dimensions.get('window').width <= 320 ? 140 : 155,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.background,
    margin: 10,
    elevation: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  head_text: {
    fontSize: Dimensions.get('window').width <= 320 ? 18 : 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
  },
  icons: {
    width: Platform.OS == 'ios' ? '54%' : '55%',
    height: Platform.OS == 'ios' ? 54 : 55,
    marginTop: 3,
    resizeMode: 'contain'
  },
  icons2: {
    width: Platform.OS == 'ios' ? '54%' : '60%',
    height: Platform.OS == 'ios' ? 54 : 60,
    marginTop: 3,
    resizeMode: 'contain'
  },
  count_text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'normal',
    color: 'gray',
    marginTop: 3
  },
  text_view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%'
  },
  bottom_view: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  bottom_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    paddingBottom: '2%'
  },
  token_input: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  token_input_container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 90,
    paddingBottom: '5%'
  },
  procced_button: {
    width: '80%',
    backgroundColor: Colors.green,
    padding: 15,
    borderRadius: 50,
  },
  add_wallet_btn: {
    width: '80%',
    backgroundColor: '#221f1f',
    padding: 15,
    marginBottom: 10,
    borderRadius: 50,
  },
  procced_button_text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input_view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  errText: {
    color: 'red',
  }

})
