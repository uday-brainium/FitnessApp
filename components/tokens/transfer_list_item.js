import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default class Transfer_listItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: ''
    };
  }

  componentDidMount(){
    let date = new Date(this.props.date)
    
    this.setState({date: date.toLocaleDateString(), time: date.toLocaleTimeString()})
    
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
            <View style={styles.view2}>
              <Text style={styles.card_text}>To - <Text style={[styles.card_text, {fontWeight: 'bold'}]}>{this.props.toAddress.slice(0, 20)}.....</Text></Text>
              <Text style={[styles.card_text, styles.badge]}>{this.state.date}  
               &nbsp; &nbsp; &nbsp; <Text style={[styles.card_text, styles.badge]}>{this.state.time}</Text>
              </Text>
              <Text style={styles.card_text}>Status - <Text style={{ color: "green" }}>success</Text></Text>
            </View>
            <View style={styles.view3}>

              <Text style={styles.right_text}>{this.props.amount}</Text>
              <Text style={styles.right_text}>TRAN</Text>
            </View>
          </View>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    width: '100%'
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 0,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  view1: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  card_text: {
    fontSize: 16,
    marginLeft: 8
  },
  view2: {
    flex: 0.8,
  },
  view3: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  right_text: {
    fontSize: 20,
    color: "green",
    fontWeight: 'bold'
  },
});