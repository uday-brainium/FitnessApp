import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, ActivityIndicator } from 'react-native';

export default class Transfer_loader extends Component {
  

  render() {
    return (
      <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.isLoading}
            onRequestClose = {() => console.log('closing')}
            >
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20 }}>
              <View style={styles.popup_screen}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.wait_text}>Please wait..</Text>
                   <ActivityIndicator animating={this.props.isLoading} size="large" color="#c6a0f5" />
                  <Text style={styles.transfer_text}>Transfering Tokens</Text>
                </View>
              </View>
            </View>
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup_screen: {
    padding: 20,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  wait_text: {
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  transfer_text: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
})