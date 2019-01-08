import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, Platform, Dimensions, TouchableHighlight, KeyboardAvoidingView, TouchableOpacity, Animated, Keyboard, UIManager } from 'react-native'
import { Colors } from '../../config/theme';
import {  Item, Input } from 'native-base';
import Submit_button from './../commons/submit_button'


class TokenTransfer extends Component {
    constructor(props){
        super(props);
        this.state = {
          text: '',
          modalVisible: false
        }
    }

    componentDidMount(){
        //this.setState({modalVisible: true})
     }
     
     onTransferTouch = () => {
       alert('Touched')
     }
    
    render(){
         const { shift } = this.state;
        return(
            <View style={styles.container}>
           
                 <View style={styles.box_row}>

                    <View style={styles.box} >
                        <Text style={styles.head_text}>Total Distance</Text>
                        <Image style={styles.icons2} source={require('./../../assets/images/distance.png')} />
                        <Text style={styles.count_text}>3000</Text>
                    </View>

                    <View style={styles.box} >
                        <Text style={styles.head_text}>Total Token</Text>
                        <Image style={styles.icons} source={require('./../../assets/images/Tokens.png')} />
                        <Text style={styles.count_text}>220</Text>
                    </View>

                </View>
                <KeyboardAvoidingView style={styles.bottom_view} behavior="padding" enabled>
                 <View style={styles.input_view}>
                    <Text style={styles.bottom_text}>How many tokens you want to transfer to your TRON wallet ?</Text>

                    <Item style={styles.token_input_container}>
                      <Input keyboardType="phone-pad" style={styles.token_input} placeholder='Tokens' />
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
                
            </View>
            
        )
    }
}



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
        fontSize: 35,
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


export default TokenTransfer