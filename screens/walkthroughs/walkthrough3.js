import React from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  ImageBackground
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from './../../utils/scale';


export class Walkthrough3 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    /*
    let image = RkTheme.current.name === 'light'
      ? <Image source={require('../../assets/images/kittenImage.png')}/>
      : <Image source={require('../../assets/images/kittenImageDark.png')}/>;
    */
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height;
    let width = Dimensions.get('window').width;
    let height_sub = height*0.37;
    let imagePadding = height*0.07;
    let width_sub = width - 40; 

    image_circle = <Image style={{ resizeMode: 'contain', height: height_sub, width: width_sub }} source={require('../../assets/images/how_it_work_circle.png')}/> ;
    how_it_work_line = <Image  style={{ resizeMode: 'contain', width: width_sub }} source={require('../../assets/images/how_it_work_line.png')}/> ;
    return (      
      
      <View style={[styles.container,{paddingTop:imagePadding}]}>
      {image_circle} 
      {how_it_work_line}
      <RkText rkType='header2'>TRON blockchain...</RkText> 
      <RkText  style={styles.text} >
        You will need a wallet from the TRON network. 
        Go to https://tronscan.org/#/wallet/new to create a new wallet.
        Follow instructions asked by the TRON foundation.
        Save your private key.
        Do not lose it! TRON Foundation cannot help you to recover a lost private key. Do not share it! Make a backup!
        Remember your TRON wallet address.
        You will need to be a subscriber to access built-in features.
        Donations will help the 3CO network to fast-tracked our app for further developments and adding new features.
      </RkText>            
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    resizeMode: 'cover'    
  },
  container: {   
    flex: 1, 
    justifyContent: "flex-start",
    paddingTop:140,
    alignItems: 'center',    
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    color: "red",
    fontWeight: "bold"
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    margin: 10,
    color: "#000",
    fontWeight: "normal"
  }
});
