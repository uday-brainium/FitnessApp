import React, {Component} from 'react'
import {View, TouchableOpacity } from 'react-native'
import Payment from '../components/payment'
import { connect } from 'react-redux'
import { RkText } from 'react-native-ui-kitten'
import { Avatar } from '../components/avatar';
import NavigatorService from '../utils/navigator'

class Payment_screen extends Component {
    constructor(props){
        super(props);

    }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Payment '} </RkText>),
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
      console.log('PAYMENT screen', this.props);
        return(
           <View>
               <Payment />
           </View>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

export default connect( mapStateToProps)(Payment_screen);
