import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressCircle from './../commons/progressCircle'

class Activity_Tab extends Component {
    render() {
        return(
            <View style={this.props.type == 'box'? styles.container_box : styles.container}>
                <View style={styles.circle_row}>
                    <View style={{margin: 5}}>
                        <ProgressCircle />
                    </View>
        
                    <View style={{margin: 5}}>
                        <ProgressCircle />
                    </View>
        
                    <View style={{margin: 5}}>
                        <ProgressCircle />
                    </View>
               
                </View>
            </View>
            
          );
    }
}


const styles = StyleSheet.create({
  container_box: {
        flex: 1,
        backgroundColor: '#C5A0F4',
        elevation: 5,
        justifyContent: 'center',
       // alignItems: 'center',
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 0 }
  },
  container: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
     },
  circle_row: {
    paddingTop: '6.5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  }
});

export default Activity_Tab;