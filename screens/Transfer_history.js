import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import ListItem from '../components/tokens/transfer_list_item'
import Apis from '../actions/common_action';
import styles from '../components/commons/styles';
import Loader from './../components/commons/Loader'
import { Colors } from '../config/theme';
let ls = require('react-native-local-storage');


let totalDistance = 0
let totalTokens = 0


class Transfer_details extends Component {
 
    state = {
      history: [],
      loading: true,
      debitedTokens: 0,
      leftToken: 0,
      totalTokens: 0,
      requestLoading: true
    }
   

  static navigationOptions = {
    title: "Transfer history",
  };

  componentDidMount() {
   
    totalDistance = 0
    totalTokens = 0
    let data = this.props.activity.overall_activity
    for (let i = 0; i < data.length; i++) {
      totalDistance = totalDistance + data[i].totaldistance
      totalTokens = totalTokens + data[i].totaltokens
      this.state.totalTokens += data[i].totaltokens
    }

   //this.setState({leftToken: this.props.navigation.getParam('leftToken')})
    
    ls.get('userdata').then(data => {
      let userid = JSON.parse(data)._id
      Apis.get_transfer_history(userid)
      .then((res) => res.json())
      .then(response => {
        if(response.response) {
          this.setState({history: response.response, loading: false})
        } 
      })
      Apis.get_debited_tokens(userid)
      .then(res2 => res2.json())
      .then(response2 => {
        this.setState({debitedTokens: response2.response, requestLoading: false})
      })
    }) 
  }


  render() {
    let leftToken = (totalTokens - this.state.debitedTokens)
    
    return (
      <View style={styles.page_container}>
      <Loader loading={this.state.loading} />
        <View style={style.head}>
          <Text style={style.head_text}> Token transfer details </Text>
        </View>
        <ScrollView style={{flex: 0.7, width: '100%', flexDirection: 'column'}}>
        {this.state.history.length != 0 ?
          this.state.history.map((data) => {
          return (
            <ListItem 
              toAddress = {data.sent_to}
              date = {data.createdAt}
              amount = {data.token_amount}
            />
          )
        }) : <View>
          <Text style={{textAlign: 'center', padding: 30}}>No transfer history found</Text>
        </View>}
        </ScrollView>
        
        <View style={{flex: 0.3, width: '100%', alignItems: 'center', marginBottom: 10}}>
          <View style={style.footer_buttom}>
            <Text style={style.token_text}>Tokens available : {!this.state.requestLoading ? leftToken.toFixed(4) : '---'}</Text>
          </View>
        </View>
        
      </View>
    );
  }
}

function mapStateToProps(state) {
  return{
    activity: state.overallActivity
  }
}

export default connect(mapStateToProps)(Transfer_details)

const style = StyleSheet.create({
  history_container: {
    backgroundColor: "#fff"
  },
  head: {
    margin: 10,
  },
   head_text: {
     fontSize: 16,
     fontWeight: 'bold'
   },
   footer_buttom: {
     padding: 15,
     backgroundColor: 'green',
     width: '95%',
     borderRadius: 10,
   },
   token_text: {
     textAlign: 'center',
     color: '#fff',
     fontSize: 18
   }
})