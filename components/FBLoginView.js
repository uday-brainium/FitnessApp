import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
var Icon = require('react-native-vector-icons/FontAwesome');

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
	};

  constructor(props) {
      super(props);
    }

    render(){
        return (
          <View style={styles.btn_view}>
            <TouchableOpacity onPress={() => {
                if(!this.context.isLoggedIn){
                  this.context.login()
                }else{
                  this.context.login()
                }

              }} style={styles.fb_btn}>
               <Text style={styles.btn_text}>Sign in with Facebook</Text>
            </TouchableOpacity>
          </View>
      )
    }
}

const styles = StyleSheet.create({
    fb_btn: {
        padding: 12,
        backgroundColor: '#3578e5',
        color: '#fff',
        borderRadius: 5,
        width: '91%'
    },
    btn_text: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn_view: {
        justifyContent: 'center',
        alignItems: 'center',
       // width: '80%'
    }
})
module.exports = FBLoginView;
