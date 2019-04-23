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


export class Walkthrough1 extends React.Component {

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
      <RkText rkType='header2'>Introducing the 3CO network...</RkText> 
      <RkText  style={styles.text}> A financial rewards from a social and health based token.
        What if your health could be converted into wealth?
        Your healthy habits earning rewards powering a better tomorrow.
        A cleaner, energy efficient and friendlier ecosystem powered by the hope of a brighter future.
        Unlock your willpower to change the world through a blockchain fuelled by introducing a sustainable ecosystem.
        Join a global network of people just like you.

        Earning rewards while working for a brighter future.</RkText>            
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
    margin: 0,
    flex: 1, 
    justifyContent: "flex-start",
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
