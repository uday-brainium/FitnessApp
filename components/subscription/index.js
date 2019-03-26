import React, {Component} from 'react'
import {View, Text, ImageBackground, Image, Alert, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Colors } from './../../config/theme'
import {connect} from 'react-redux'
import { check_subscription, subscribe } from '../../actions/payment_action'
const ls = require('react-native-local-storage')
import {paypal_client_id} from './../../config/credentials'
import PayPal from 'react-native-paypal-wrapper'
import Loader from './../../components/commons/Loader'


class Subscription extends Component {
    constructor(props){
      super(props);
      this.state = {
        is_subscribed: false,
        userid: '',
        loading: true
      }
    }

    componentDidMount() {
      ls.get('userdata').then ((data) => {
          let userid = JSON.parse(data)._id
          this.setState({userid})
          this.props.check_subscription(userid)
      })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps){
        this.setState({is_subscribed: nextProps.subscribed.is_subscribed},  () => {
          this.state.is_subscribed ? 
          this.props.nav.navigate('Token_transfer') : 
          this.setState({loading: false})
        })
      }
    }

    paymentInit = () => {
      PayPal.initialize(PayPal.SANDBOX, paypal_client_id);
      PayPal.pay({
        price: '10',
        currency: 'AUD',
        description: 'Pay subscription fee for fitnessApp',
      }).then((confirm) => {
        let  subscribe_data = {
          userid: this.state.userid,
          trans_id: confirm.response.id
        }
        this.props.subscribe(subscribe_data).then(() => {
          Alert.alert('You have subscribed successfully', 'Your one time subscription is completed now are able to transfer tokens to your TRON wallet.',
          [
            {text: 'Okay', onPress: () => this.props.nav.navigate('Token_transfer')},
          ], {cancelable: false})
        })
      })
       .catch(error => console.log('User cancled!'));
    }

    render(){
        return(
           <View style={styles.container}>
               <ImageBackground style={styles.head_image} source={ require('./../../assets/images/Group512.png') }>
                  <View style={styles.topView}>
                    <View style={styles.price_unit}>
                        <Text style={styles.price_unitText}>$</Text>
                    </View>
                    
                    <View style={styles.price}>
                        <Text style={styles.priceText}>10</Text> 
                    </View>
                  </View>
               </ImageBackground>
                <Loader loading={this.state.loading} />
               <View style={styles.subscription_view}>
                 <Text style={styles.subscription_text}> One Time Subscription </Text>
                 <Image style={styles.line} source={require('./../../assets/images/Line17.png')}/>
               </View>
               
               <View style={styles.reward_view}>
                   <Text style={styles.reward_text}>You will be rewared 500 Tokens with this subscription </Text>
                   <Text></Text>
               </View>
            
              {this.state.is_subscribed ?
                <View style={styles.button_view}>
                  <Text style={styles.subscribed_text}>You are already subscribed !</Text>
                </View> : 
                <View style={styles.button_view}>
                <TouchableOpacity disabled={this.state.is_subscribed} onPress={this.paymentInit} style={styles.procced_button}>
                  <Text style={styles.procced_button_text}>
                      Procced
                  </Text>
                 </TouchableOpacity>
                </View>
              }   
           </View>
        )
    }
}

function mapStateToProps(state) {
  return{
    subscribed: state.is_subscribed
  }
}

export default connect(mapStateToProps, {check_subscription, subscribe})(Subscription)

const styles = StyleSheet.create({
    container: {
        paddingTop: '3%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        height: Dimensions.get('window').height,
    },
    head_image: {
        width: Dimensions.get('window').width <= 320 ? 150 : 160,
        height: Dimensions.get('window').width <= 320 ? 150 : 160,
    }, 
    price_unit: {
        flex:1,
        flexDirection: 'row',
    },
    price_unitText: {
        marginTop: Dimensions.get('window').width <= 320 ? 20 : 30,
        marginLeft: 20,
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    price: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceText: {
        marginTop: '-50%',
        fontSize: Dimensions.get('window').width <= 320 ? 70 : 80,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    topView: {
        flex: 1,
        flexDirection: 'column',
    },
    subscription_view: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        paddingTop: '3%'
    },
    subscription_text: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'gray',
        paddingBottom: '5%'
    },
    line: {
        width: '140%',
    },
    reward_view: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingTop: '3%'
    },
    reward_text:  {
        flexWrap: 'wrap',
        fontSize: Dimensions.get('window').width <= 320 ? 18 : 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
    },
    token_view:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingTop: '7%'
    },
    token_text: {
        flexWrap: 'wrap',
        fontSize: Dimensions.get('window').width <= 320 ? 16 : 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
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
    button_view: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        paddingBottom: '17%'
    },
    subscribed_text: {
      padding: 10,
      backgroundColor: '#1fcbbf',
      borderRadius: 20,
      color: '#fff',
      fontSize: 20,
    }
})