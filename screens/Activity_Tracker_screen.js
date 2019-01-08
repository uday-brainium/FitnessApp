import React, {Component} from 'react'
import {View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import Activity_Tracker from './../components/dashboard/'
import { connect } from 'react-redux'
import { RkText } from 'react-native-ui-kitten'
import { Avatar } from './../components/avatar'
import NavigatorService from './../utils/navigator'

class Activity_Tracker_screen extends Component {
    constructor(props){
        super(props);

    }

    static navigationOptions = {
        headerTitle: (<RkText > {' Activity Tracker '} </RkText>),
        headerLeft: ( <View style={{marginLeft: 16}}>
        <TouchableHighlight
                        onPress={() => this.props.navigation.toggleDrawer()}>
                         <Avatar
                          rkType='image'
                          source={require('../assets/images/menu.png')}
                        />
                        </TouchableHighlight>
                 </View>),
      };

    render(){
        return(
           <View>
               <Activity_Tracker />
           </View>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

export default connect( mapStateToProps)(Activity_Tracker_screen);
