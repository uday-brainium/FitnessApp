import React, {Component} from 'react'
import {View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import Calorie_Tracker from './../components/calorieTracker'
import { connect } from 'react-redux'
import { RkText } from 'react-native-ui-kitten'
import { Avatar } from './../components/avatar'
import NavigatorService from './../utils/navigator'

class Calorie_Tracker_screen extends Component {
    constructor(props){
        super(props);

    }

      static navigationOptions = ({navigation}) => {
           const {params = {}} = navigation.state;
           return {
               headerTitle: (<RkText > {' Calorie Tracker '} </RkText>),
               headerLeft: ( <View style={{marginLeft: 16}}>
                             <TouchableOpacity
                               onPress={() =>  params.openDrawer()}>
                                <Avatar
                                 rkType='image'
                                 source={require('../assets/images/menu.png')}
                               />
                               </TouchableOpacity>
                        </View>),
           };
       };

      componentDidMount() {
        this.props.navigation.setParams({
              openDrawer: this.openDrawerNow
          });
      }

      openDrawerNow = () => {
        this.props.navigation.toggleDrawer()
      }

    render(){
        return(
           <View>
               <Calorie_Tracker />
           </View>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

export default connect( mapStateToProps)(Calorie_Tracker_screen);
