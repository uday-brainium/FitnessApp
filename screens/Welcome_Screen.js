import React, { Component } from 'react';
import { View , ImageBackground} from 'react-native';
import {Button,Text} from 'native-base';
import { connect } from 'react-redux';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {Walkthrough} from './../components/walkthrough';
import {Walkthrough1} from './walkthroughs/walkthrough1';
import {Walkthrough2} from './walkthroughs/walkthrough2';
import {Walkthrough3} from './walkthroughs/walkthrough3';
import {PaginationIndicator} from './../components';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import AppSpinner from './../components/Loading/AppSpinner';
import NavigatorService from './../utils/navigator';
import ErrorMessage from './../components/ErrorMessage';
let ls = require('react-native-local-storage');

class Welcome_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {index: 0,};
  }

  componentWillMount() {
    ls.save('isOpened', 'opened')
  }

  componentDidMount() {
      this.loadFonts();
      this.props.authStateChanged(this.props.loginStatus)
  }

 async loadFonts() {
  try {
        await Expo.Font.loadAsync({
            'fontawesome': require('./../assets/fonts/fontawesome.ttf'),
            'icomoon': require('./../assets/fonts/icomoon.ttf'),
            'Righteous-Regular': require('./../assets/fonts/Righteous-Regular.ttf'),
            'Roboto-Bold': require('./../assets/fonts/Roboto-Bold.ttf'),
            'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf'),
            'Roboto-Medium': require('./../assets/fonts/Roboto-Medium.ttf'),
            'Roboto-Regular': require('./../assets/fonts/Roboto-Regular.ttf'),
            'Roboto_medium' : require('./../assets/fonts/Roboto-Medium.ttf'),
        });
      } catch (e) {
        console.warn(
          'There was an error caching assets (see: main.js), perhaps due to a ' +
            'network timeout, so we skipped caching. Reload the app to try again.'
      );

    } finally {
      this.props.fontLoadedChanged();
    }
}
  changeIndex(index) {
    this.setState({index})
  }

  render() {
    if ( this.props.loginStatus == 'initial' || !this.props.fontLoaded ) {
        return ( <AppSpinner /> );
    }else

    return (
      <ImageBackground  source={require('../assets/images/how_it_work_bg.png')}  style={styles.mainContainer} >
        <View style={styles.screen}>
            <View style={styles.containerSignInHeader} >
              <ErrorMessage />
              <Walkthrough onChanged={(index) => this.changeIndex(index)}>
                <Walkthrough1/>
                <Walkthrough2/>
                <Walkthrough3/>
              </Walkthrough>
            </View>
            <View style={styles.containerSignInBody}>
            <PaginationIndicator length={3} current={this.state.index}/>
            </View>
            <View style={styles.containerSignInFooter}>
              <Button transparent success style={[styles.button]}
                onPress={() => {
                    NavigatorService.reset('login_screen');
                    //This is for development ease purpose for avoiding login everytime
                    //NavigatorService.reset('dashboard_screen');
                  }} >
                  <Text style={[styles.text]}>{this.state.index ===2 ? ' GET STARTED' :'Skip'} </Text>
                </Button>
            </View>
        </View>
      </ImageBackground>
    )
  }
}
// changePasswordScreen  ,login_screen
const mapStateToProps = ({ auth }) => {
  const { loginStatus, fontLoaded } = auth;
  return { loginStatus, fontLoaded };
};

let styles = RkStyleSheet.create(theme => ({
  mainContainer: {
    flex: 1,
    resizeMode: 'cover',

  },
  screen: {
    paddingVertical: 0,
    flex: 1,
    alignSelf: "stretch",
  },containerSignInHeader: {
    flex: 150,
    justifyContent:'center',
    alignItems :'center',
  },
  containerSignInBody: {
    flex: 10,
    alignSelf: "stretch",
    justifyContent:'center',
    alignItems :'center',
  },
  containerSignInFooter: {
    flex :14,
    flexDirection: 'row' ,
    alignSelf: "stretch",
    justifyContent:'flex-end',
    alignItems :'center',
    marginRight:20 ,
    marginTop:20
  },
  button:{

  },
  text: {
    color: '#47D625',
  }
}));

export default connect( mapStateToProps , {
  loginStatusChanged, authStateChanged, fontLoadedChanged
})(Welcome_Screen);
