import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, Platform, Dimensions, TouchableHighlight, KeyboardAvoidingView, TouchableOpacity, Animated, Keyboard, UIManager } from 'react-native'
import { Colors } from '../../config/theme';
import {  Item, Input } from 'native-base';
import {connect} from 'react-redux'
import Submit_button from './../commons/submit_button'
import { check_subscription } from '../../actions/payment_action'
import * as config  from './../../config/credentials'
import Alert_modal from './alert_modal'
import Transfer_pop from './transfer_pop'
import TronWeb from 'tronweb'
const ls = require('react-native-local-storage')
import Loader from './../../components/commons/Loader'

const HttpProvider = TronWeb.providers.HttpProvider;

let totalDistance = 0
let totalTokens = 0

class TokenTransfer extends Component {
    constructor(props){
        super(props);
        global.Buffer = global.Buffer || require("buffer").Buffer
        this.state = {
          tokenField: '',
          modalVisible: false,
          showAlert: false,
          showPop: false,
          loading: true,
          is_subscribed: false
        }
        this.fullNode =  new HttpProvider(config.fullNode);
        this.solidityNode = new HttpProvider(config.solidityNode);
        this.fullNode_test =  new HttpProvider(config.fullNode_test);
        this.solidityNode_test = new HttpProvider(config.solidityNode_test);
        this.privateKey = config.privateKey
        this.myaddress = config.myAddress
        this.tronWeb = new TronWeb(this.fullNode, this.solidityNode)
        this.tronWeb.setPrivateKey(this.privateKey)
    }

    check_subscribed = () => {
      ls.get('userdata').then((data) => {
        let userid = JSON.parse(data)._id
        this.props.check_subscription(userid)
      })
    }

    componentDidMount(){
      this.check_subscribed()
      totalDistance = 0
      totalTokens = 0
      let data = this.props.data.overall_activity
      for(let i=0; i < data.length; i++) {
        totalDistance = totalDistance + data[i].totaldistance
        totalTokens = totalTokens + data[i].totaltokens
      }
      this.setState({test: true})
      const tronWeb = new TronWeb(this.fullNode, this.solidityNode);
      
      tronWeb.setAddress('41486C088A211DBE147DD91D70C3E51606C29FC34C');

      //FOR TESTING ONLY 
      // var body = {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     "privateKey":this.privetKey, 
      //     "toAddress": "419F29BBB733807AB5B61976928E68482D78C97ED8", 
      //     "amount": 1
      //   })
      // }
      // fetch('https://api.trongrid.io/wallet/easytransferbyprivate', body).then((res) => {
      //   res.json().then((response) => {
      //     console.log("assetData", response);
          
      //   })
      // })

      //FOR TESTING ONLY 

     }

     testCall = () => {

      // this.tronWeb.trx.sendTransaction("TQUnSEm7C5jMWsbG1U9Zx5UapXM6uXsvjA", 10, this.privetKey, (error, userBalance) => {
      //   if(error)
      //     return console.log(error);

      //   console.log(`User's balance is:`, userBalance);
      //   });

    //   this.tronWeb.trx.sendToken("TQUnSEm7C5jMWsbG1U9Zx5UapXM6uXsvjA", 5, "1000239", this.privateKey, (error, userBalance) => {
    //     if(error)
    //       return console.log(error);
    //     console.log(`User's balance is:`, userBalance);
    //     });

        // this.tronWeb.createAccount((err, res) => {
        //     console.log('acc', res);
            
        // })

        this.tronWeb.trx.sendToken("TQUnSEm7C5jMWsbG1U9Zx5UapXM6uXsvjA", 5, "1000239", this.privateKey, (error, userBalance) => {
        if(error)
            return console.log(error);
        console.log(`User's balance is:`, userBalance);
        });
     }

     UNSAFE_componentWillReceiveProps(nextProps) {
       if(nextProps){
         if(!nextProps.subscribed.is_subscribed) {
           this.setState({ loading: false})
         } else {
          this.setState({loading: false, is_subscribed: true})
         }
       }
     }

     inputChange = (val) => {
        this.setState({tokenField: val})
        if(totalTokens < val.length)
         alert('more')
     }

     onTransferTouch = () => {
       if(this.state.is_subscribed) {
        this.setState({showPop: true})
       } else {
        this.setState({showAlert: true})
       }
     }

     componentWillUnmount() {
      this.setState({showAlert: false, showPop: false})
     }

     closeAlert = () => {
       this.setState({showAlert: false})
     }
    closePop = () => {
      this.setState({showPop: false})
    }
    render(){
      
        return(
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
                        <Text style={styles.count_text}>{totalTokens.toFixed(4)}</Text>
                    </View>

                </View>
                <Loader loading={this.state.loading} />
                <KeyboardAvoidingView style={styles.bottom_view} behavior="padding" enabled>
                 <View style={styles.input_view}>
                    <Text style={styles.bottom_text}>How many tokens you want to transfer to your TRON wallet ?</Text>

                    <Item style={styles.token_input_container}>
                      <Input onChangeText={(text) => this.inputChange(text)} keyboardType="phone-pad" style={styles.token_input} placeholder='Tokens' />
                    </Item>
                 </View>
                 </KeyboardAvoidingView>
                 <View style={styles.button_view}>
                  <TouchableOpacity onPress={this.onTransferTouch} style={styles.procced_button}>
                      <Text style={styles.procced_button_text}>
                          Procced
                      </Text>
                    </TouchableOpacity>
                 </View>
                 <Alert_modal showAlert={this.state.showAlert} nav={this.props.nav} close={this.closeAlert}/>
                 <Transfer_pop showAlert={this.state.showPop} nav={this.props.nav} close={this.closePop} />
            </View>
            
        )
    }
}

function mapStateToProps(state){ 
    return{
      data: state.overallActivity,
      subscribed: state.is_subscribed
    }
}

export default connect(mapStateToProps, {check_subscription})(TokenTransfer)



const styles =  StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: Colors.background,
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
        resizeMode:'contain'
    },
    icons2: {
        width: Platform.OS == 'ios' ? '54%' : '60%',
        height: Platform.OS == 'ios' ? 54 : 60,
        marginTop: 3,
        resizeMode:'contain'
    },
    count_text: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'normal',
        color: 'gray',
        marginTop: 3
    },
    text_view: {
        alignItems:'center',
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
      alignItems:'center',
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
    procced_button_text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    input_view: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  
})
