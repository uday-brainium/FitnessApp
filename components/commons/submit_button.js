import React, { Component } from 'react';
import {
  View, 
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { Colors } from './../../config/theme'

class Submit_button extends Component {

  constructor(props) {
    super(props);  
  } 

  render() {
    return (
         <View style={styles.button_view}>
              <TouchableOpacity style={styles.procced_button}>
                <Text style={styles.procced_button_text}>
                    {this.props.Text}
                </Text>
               </TouchableOpacity>
         </View>
    );
  }
}

const styles = StyleSheet.create({
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
            paddingTop: '0%',
        }
    })

export default Submit_button;
