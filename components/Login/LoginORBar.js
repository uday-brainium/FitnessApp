import React, { Component } from 'react';
import { View ,Image,Text} from 'react-native';

import { scale,scaleModerate, scaleVertical } from './../../utils/scale';

import {
  RkStyleSheet,RkButton
} from 'react-native-ui-kitten';


class LoginORBar extends Component {
  render () {
    return (
      <View >         
         <View  style={[styles.toolbar, styles.text]}>         
             <Image  style={[styles.toolbarTitle,{ resizeMode: 'contain'}]} source={require('../../assets/images/how_it_work_line.png')}/>
             <Text > OR </Text>
             <Image  style={[styles.toolbarTitle,{ resizeMode: 'contain'}]} source={require('../../assets/images/how_it_work_line.png')}/>  
         </View>        
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  save: {
    marginVertical: 9,
    marginHorizontal: 20
  },
  containerBG: {
    backgroundColor:'#228B22',
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25,
    backgroundColor: theme.colors.green,
    flexDirection: 'row'
  },
  toolbar:{ 
    marginHorizontal: 16,
    flexDirection:'row', 
    marginTop: 10, 
    marginBottom: 10, 
},
toolbarTitle:{
    flex:1               
},
  text: {    
    color: theme.colors.screen.base,
  }
}));




export default LoginORBar;
