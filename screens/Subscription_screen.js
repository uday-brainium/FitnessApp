import React, {Component} from 'react'
import {View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import Subscription from './../components/subscription'
import { connect } from 'react-redux'
import { RkText } from 'react-native-ui-kitten'
import { Avatar } from './../components/avatar'
import NavigatorService from './../utils/navigator'

class Subscription_screen extends Component {
    constructor(props){
        super(props);

    }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Subscriptions '} </RkText>),
           headerLeft: ( <View style={{marginLeft: 16}}>
                         <TouchableHighlight
                           onPress={() =>  params.openDrawer()}>
                            <Avatar
                             rkType='image'
                             source={require('../assets/images/menu.png')}
                           />
                           </TouchableHighlight>
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
               <Subscription />
           </View>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

export default connect( mapStateToProps)(Subscription_screen);
