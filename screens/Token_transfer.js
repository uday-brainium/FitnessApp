import React, {Component} from 'react'
import {View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import TokenTransfer from '../components/tokens/tokentransfer'
import { connect } from 'react-redux'
import { RkText } from 'react-native-ui-kitten'
import { Avatar } from '../components/avatar'
import NavigatorService from '../utils/navigator'

class Token_transfer extends Component {
    constructor(props){
        super(props);

    }

    static navigationOptions = ({navigation}) => {
         const {params = {}} = navigation.state;
         return {
             headerTitle: (<RkText > {' Token Transfer '} </RkText>),
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
               <TokenTransfer nav={this.props.navigation}/>
           </View>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

export default connect( mapStateToProps)(Token_transfer);
