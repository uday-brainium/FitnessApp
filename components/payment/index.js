import React , { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import gstyle from './../commons/styles'
import { Item, Input, Label } from 'native-base';
import { Colors } from './../../config/theme'


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          keyboardOpen: false,
          cardnumber: '',
          name: '',
          expire: '',
          cvv: ''
        }
    }



    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
    }

    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }

    onProccedTouch = () => {
      alert('Payment initiated');
    }

    _keyboardDidShow () {
      this.setState({keyboardOpen: true})
    }
  
    _keyboardDidHide () {
      this.setState({keyboardOpen: false})
    }

    expiryEntry = (text) => {
      if(text.length == 2) {
        this.setState({expire: `${text}/`})
      } else {
        this.setState({expire: text})
      }
    }
    cardNumberEntry = (text) => {
       if(text.length == 4 || text.length == 11 || text.length == 18) {
         this.setState({cardnumber: `${text} - `})
       } else {
         this.setState({cardnumber: text})
       }
     }

    render() {
       return(
        <KeyboardAvoidingView style={gstyle.page_container} behavior="padding" enabled>
     
         <View style={styles.page} >
         { !this.state.keyboardOpen &&
            <View style={styles.image_container}>
            <Image
                source ={require('./../../assets/images/Payment_banner.png')}
                style={styles.banner}
                >
            </Image>
           </View>
         }
          <View style={{width: '80%', paddingTop: '5%'}}>
            <Item floatingLabel style={styles.field} >
              <Label style={styles.fields}>Card number</Label>
              <Input 
               value={this.state.cardnumber} 
               keyboardType="phone-pad"
               maxLength={25}
               onChangeText={(text) => this.cardNumberEntry(text)}
               />
            </Item>
    
            <Item floatingLabel style={styles.field}>
              <Label  style={styles.fields}>Name on card</Label>
              <Input 
               value={this.state.name}
               onChangeText= {(text) => this.setState({name: text})}
             />
            </Item>

            <View style={styles.card_row}>
              <View style={{width: '46.5%', marginRight: '3%'}}>
                <Item floatingLabel style={styles.field} >
                  <Label style={styles.fields}>Expire on</Label>
                  <Input 
                   value={this.state.expire} 
                   keyboardType="phone-pad" 
                   maxLength={5} 
                   onChangeText= {(text) => this.expiryEntry(text)}
                  />
               </Item>
              </View>

              <View style={{width: '47%', marginLeft: '3%'}}>
                <Item floatingLabel style={styles.field} last>
                  <Label style={styles.fields}>Cvv</Label>
                  <Input
                   value={this.state.cvv} 
                   keyboardType="phone-pad" 
                   secureTextEntry
                   password={true}
                   maxLength={3}
                   onChangeText= {(text) => this.setState({cvv: text})}
                   />
               </Item>
              </View>
            </View>
          </View>
        
          <View style={{padding: 20}}></View>

          <View style={styles.button_view}>
            <TouchableOpacity onPress={this.onProccedTouch} style={styles.procced_button}>
              <Text style={styles.procced_button_text}>
                  Procced
              </Text>
              </TouchableOpacity>
          </View>

          </View>

        </KeyboardAvoidingView>
       )
    }
}

const styles = StyleSheet.create({
   banner: {
     position: 'relative',
     width: '100%',
     height: 220,
     resizeMode:'contain'
   },
   page: {
     flex: 0.6,
     width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '25%'
   },
   image_container: {
    marginTop: '2%',
    position: 'relative',
    alignItems: 'center',
    width: '100%'
   },
   form: {
     paddingTop: 20,
     alignItems: 'center',
     justifyContent: 'center',
     paddingBottom: '5%',
     width: '80%'
   },
   card_row: {
     //flex: 1,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center'
   },
   fields: {
     marginTop: 0,
     fontSize: 18,
     fontWeight: 'bold',
     color: 'gray'
   },
   field: {
    marginTop: 12,
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
        flex: 2,
        
        alignItems: 'center',
        width: '95%',
        paddingTop: '5%',
    }
})

export default Payment