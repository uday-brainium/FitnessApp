import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
  page_container: {
    alignItems: 'center',
   // justifyContent: 'center',
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff'
  },
});