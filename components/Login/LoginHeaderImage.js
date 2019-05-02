import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

import { scaleModerate, scaleVertical } from './../../utils/scale';

import {
  RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';


class LoginHeaderImage extends Component {

  constructor(props) {
      super(props)
      this.state = {
        fbcheckingFinished: false
      }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.loginStatus == 'fbchecking' && nextProps.loginStatus == 'fbloginfailed' ) {
      // only turns on when the loginstatus changes from fbchecking to fbloginfailed
      this.setState({fbcheckingFinished: true});
    } else {
      this.setState({fbcheckingFinished: false});
    }
  }

  _renderImage() {
    

        if ( this.props.emailPwdBtnStr == 'SignUp' || this.props.emailPwdBtnStr == 'SignIn' || this.props.emailPwdBtnStr == 'Reset') {              
          
          return ( <View style={styles.signTextContainer}><RkText  rkType='h1' >{this.props.headerString}</RkText></View>);  

        }else if ( this.props.emailPwdBtnStr == 'Profile' ) {

          return (
          <View style={styles.signUpTextContainer}>
            {/* <Image style={styles.profileImage} source={require('./../../assets/images/cartLogo.png')}/> */}
            <RkText rkType='h1'>{this.props.headerString}</RkText>
          </View>
          );
        }
  }

  render() {
    return (
      <View style={styles.Container}>
        {this._renderImage()}
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loginStatus, } = auth;
  return { loginStatus, };
};

let styles = RkStyleSheet.create(theme => ({
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),    
  },
  profileImage: {
    marginVertical: 15,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
Container:{
    flex:1, 
},
signTextContainer:{
    flex:0.6,
    marginLeft: 18,
    marginBottom: -10,
    justifyContent:'flex-end',
      
},signUpTextContainer:{  
  flex:1,   
  justifyContent:'flex-end', 
  alignItems :'center' 
},
text:{
    color:'#000',
    textAlign:'left',
    fontWeight:'bold',
    marginLeft:20,    
}
}));

export default connect(mapStateToProps,null)(LoginHeaderImage);
