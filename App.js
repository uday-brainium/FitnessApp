
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Drawer_Component from './screens/Drawer'
import { View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { bootstrap } from './config/bootstrap';
import { RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import NavigatorService from './utils/navigator';
let ls = require('react-native-local-storage');
import Welcome_Screen from './screens/Welcome_Screen';
import Register_Screen from './screens/Register_Screen';
import Login_Screen from './screens/Login_Screen';
import Splash_screen from './screens/Splash_screen';
import Menu_Screen from './screens/Menu_Screen';
import Subscription_screen from './screens/Subscription_screen';
import Token_transfer from './screens/Token_transfer';
import Dashboard_Screen from './screens/Dashboard_Screen';
import Signup_Screen from './screens/Signup_screen';
import Reset_Screen from './screens/Reset_Screen';
import Profile_Screen from './screens/Profile_Screen';
import Calorie_Tracker_screen from './screens/Calorie_Tracker_screen';
import Activity_Tracker_screen from './screens/Activity_Tracker_screen';
import Payment_screen from './screens/Payment_screen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import Terms_Screen from './screens/Terms_screen';


const LoginNavigator = createStackNavigator({
  splash_screen: { screen: Splash_screen },
  register_screen: { screen: Register_Screen },
  welcome_screen: { screen: Welcome_Screen },
  reset_screen: { screen: Reset_Screen },
  profile_screen: { screen: Profile_Screen },
  signup_screen: { screen: Signup_Screen },
  login_screen: { screen: Login_Screen },
  dashboard_screen: { screen: Dashboard_Screen},
  menu_Screen: { screen: Menu_Screen},
  subscription_screen: {screen: Subscription_screen},
  changePasswordScreen: { screen: ChangePasswordScreen},
  Token_transfer: {screen : Token_transfer},
  calorie_tracker_screen: { screen: Calorie_Tracker_screen },
  activity_tracker_screen: { screen: Activity_Tracker_screen },
  payment_screen: { screen: Payment_screen },
  terms_screen: { screen: Terms_Screen },
  },
  {
    drawerLabel: 'Home',
    initialRouteName: 'splash_screen',
    headerBackTitleVisible: true,
    headerTransitionPreset: 'fade-in-place',
    navigationOptions: {
      tabBarVisible: false,
    },
    swipeEnabled: true,
    lazy: true,
  });

  const NavigatorProfile = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'profile_screen',}
    )
  const NavigatorDashboard = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'dashboard_screen',}
    )
  const NavigatorSubscription = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'subscription_screen',}
    )
  const NavigatorCalorieTracker = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'calorie_tracker_screen',}
    )
  const NavigatorTokenTransfer = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'Token_transfer',}
    )
  const NavigatorPayment = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'payment_screen',}
    )
  const NavigatorChangePass = createStackNavigator({
    profile_screen: { screen: Profile_Screen },
    menu_Screen: { screen: Menu_Screen},
    dashboard_screen: { screen: Dashboard_Screen},
    subscription_screen: {screen: Subscription_screen},
    calorie_tracker_screen: { screen: Calorie_Tracker_screen },
    Token_transfer: {screen : Token_transfer},
    payment_screen: { screen: Payment_screen },
    terms_screen: { screen: Terms_Screen },
    changePasswordScreen: { screen: ChangePasswordScreen}
    },{initialRouteName: 'changePasswordScreen',}
    )

  //Main drawer navigator
  const Drawer = createDrawerNavigator({
    home: {screen: LoginNavigator },
    menu_Screen: { screen: Menu_Screen},
    Profile: { screen: NavigatorProfile },
    ActivityTracker: { screen: NavigatorDashboard},
    Subscriptions: {screen: NavigatorSubscription},
    CalorieTracker: { screen: NavigatorCalorieTracker },
    TokenTransfer: {screen : NavigatorTokenTransfer},
    changePasswordScreen: { screen: NavigatorChangePass},
    payment_screen: { screen: NavigatorPayment },
    terms_screen: { screen: Terms_Screen }
  },{
    drawerType: 'slide',
    contentComponent: Drawer_Component
  });

  //Locking the Drawer for some screens
  LoginNavigator.navigationOptions = ({ navigation }) => {
   name = (navigation.state.index !== undefined ? navigation.state.routes[navigation.state.index] : navigation.state.routeName)
    let drawerLockMode = 'locked-closed'
    if (name.routeName != 'login_screen' && name.routeName != 'signup_screen' && name.routeName != 'splash_screen' && name.routeName != 'welcome_screen') {
      drawerLockMode = 'unlocked'
    }

    return {
      drawerLockMode,
    };
  }

  const _XHR = GLOBAL.originalXMLHttpRequest ?  
    GLOBAL.originalXMLHttpRequest :           
    GLOBAL.XMLHttpRequest                     

    XMLHttpRequest = _XHR

export default class App extends React.Component {
  state = { areReasourcesReady: false };
  constructor(props) {
    super(props);
     this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
     bootstrap();
    console.disableYellowBox = true;
  }



  render() {
      return (
        <Provider store={this.store}>
          <View style={styles.container}>

          <Drawer ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}>

          </Drawer>
          </View>
        </Provider>
      );
  }

}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
}));
