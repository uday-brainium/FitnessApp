import React, {Component} from 'react'
import {View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import Terms_condition from '../components/terms/terms_condition'
import { connect } from 'react-redux'
import { RkText } from 'react-native-ui-kitten'
import { Avatar } from '../components/avatar'


class Terms_screen extends Component {
    constructor(props){
        super(props);

    }

    static navigationOptions = {
     header: null,
    };

 
    render(){
      return(
          <View>
              <Terms_condition />
          </View>
      )
    }
}

function mapStateToProps(state) {
    return{

    }
}

export default connect( mapStateToProps)(Terms_screen);
  