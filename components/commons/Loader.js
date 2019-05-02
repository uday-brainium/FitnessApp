import React, { Component } from 'react';
import { View, Text, Modal, ActivityIndicator, Dimensions } from 'react-native';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.loading}
          onRequestClose={() => console.log('close')
          }> 
          <View style={{backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', flex: 1, height: Dimensions.get('window').height + 20}}>
            <View>
               <View style={{justifyContent: 'center'}}>
                 <ActivityIndicator animating={this.props.loading} size="large" color="#1fcbbf" />
               </View> 
             </View>
            </View>
          </Modal>
      </View>
    );
  }
}
