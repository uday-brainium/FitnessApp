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


export class Walkthrough2 extends React.Component {

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
      <RkText rkType='header2'>What is TRAN...</RkText> 
      <RkText  style={styles.text} >It is an app supported on both iOS and Android platform.
        It is a fitness app that uses GPS to track your daily, weekly and monthly workouts routine.
        All ages can use it by offering three modes of rewarding.
        It promotes healthy living and fights obesity by rewarding tokens to generates wealth.
        It can be download onto your mobile device with regular updates and enhancements.
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
