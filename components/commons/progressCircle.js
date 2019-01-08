import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CircularProgress = () => {
  return(
    <View style={styles.container}>
      <View style={styles.progressLayer}></View>
      <View style={styles.offsetLayer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderWidth: 7,
    borderRadius: 100,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLayer: {
    width: 100,
    height: 100,
    borderWidth: 7,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'red',
    borderBottomColor: 'green',
    borderRightColor: 'blue',
    borderTopColor: 'blue',
    transform:[{rotateZ: '-45deg'}],
  },
  offsetLayer: {
    width: 100,
    height: 100,
    borderWidth: 7,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    transform:[{rotateZ: '-135deg'}]
  }
});

export default CircularProgress;