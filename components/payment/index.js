import React , { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native'
import gstyle from './../commons/styles'
import { Item, Input, Label } from 'native-base';
import { Colors } from './../../config/theme'

class Payment extends Component {
    constructor(props) {
        super(props);

    }

    onProccedTouch = () => {
      alert('Payment initiated');
    }

    render() {
       return(
        <KeyboardAvoidingView style={gstyle.page_container} behavior="padding" enabled>
     
         <View style={styles.page} >
            <View style={styles.image_container}>
              <Image
                  source ={require('./../../assets/images/Payment_banner.png')}
                  style={styles.banner}
                  >
              </Image>
             </View>
          
          <View style={{width: '80%', paddingTop: '3%'}}>
            <Item stackedLabel >
              <Label style={styles.fields}>Card number</Label>
              <Input />
            </Item>
    
            <Item stackedLabel>
              <Label  style={styles.fields}>Name on card</Label>
              <Input />
            </Item>

            <View style={styles.card_row}>
              <View style={{width: '46.5%', marginRight: '3%'}}>
                <Item stackedLabel >
                  <Label style={styles.fields}>Expire on</Label>
                  <Input />
               </Item>
              </View>

              <View style={{width: '45%', marginLeft: '3%'}}>
                <Item stackedLabel last>
                  <Label style={styles.fields}>Cvv</Label>
                  <Input />
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
     marginTop: 5,
     fontSize: 18,
     fontWeight: 'bold',
     color: 'gray'
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