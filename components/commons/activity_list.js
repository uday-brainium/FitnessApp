import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Activity_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Activity History should be here</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 2,
      borderBottomColor: '#1fcbbf',
      height: 150
    }
})