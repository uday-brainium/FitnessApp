import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text, 
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { update_profile } from './../actions/fbLogin_action'
import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import NavigatorService from './../utils/navigator';
import Profile from '../components/profile'
let ls = require('react-native-local-storage');
import { design } from './../config/stylsheet'
import { Container, Content, Item, Input, Label } from 'native-base';
import { Icon } from 'react-native-elements'
let userdata 

class Profile_Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        userData: '',
        showEditModal: false,
        firstName: '',
        lastName: '',
        height: 0,
        weight: 0,
        name: '',
        errmsg: '',
        isError: false,
        firstNameErr: false,
        lastNameErr: false,
        heightErr: false,
        weightErr: false,
        loading: false,
        success: ''
      }
    }

  static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
       return {
           headerTitle: (<RkText > {' Profile '} </RkText>),
           headerLeft: ( <View style={{marginLeft: 16}}>
                         <TouchableOpacity
                           onPress={() =>  params.openDrawer()}>
                            <Avatar
                             rkType='image'
                             source={require('../assets/images/menu.png')}
                           />
                           </TouchableOpacity>
                    </View>),
       };
   };



   componentDidMount() {
     this.props.navigation.setParams({
           openDrawer: this.openDrawerNow
       });
       this.updatingStates()
   }

   updatingStates = () => {
     ls.get('userdata').then((data) => {
          userdata = JSON.parse(data)
          let name = userdata.name.split(" ");
          let fName =  name[0]
          let lName =  name[1]
          if(userdata.user_type == "facebook") {
            this.setState({userData: data, 
              firstName: fName, 
              lastName: lName,
              height: userdata.height,
              weight: userdata.weight,
              name: userdata.name
            })
          } else {
            this.setState({userData: data, 
              firstName: userdata.name_first, 
              lastName: userdata.name_last,
              height: userdata.height,
              weight: userdata.weight,
              name: userdata.name
            })
          }    
       })
   }

   componentWillReceiveProps(nextProps) {
     if(typeof nextProps != 'undefined' && typeof nextProps.userdata != 'undefined' && typeof nextProps.userdata.fbuserData != 'undefined' && typeof nextProps.userdata.fbuserData.res != 'undefined' && typeof nextProps.userdata.fbuserData.res.message != 'undefined') {
       ls.save('userdata', JSON.stringify(nextProps.userdata.fbuserData.res.message)).then( () => {
         ls.get('userdata').then((data) => {
           this.setState({userdata: JSON.parse(data)}, () => {
             this.updatingStates()
             this.setState({showEditModal: false, loading: false})
           })
         })
       })
     }
   }

   openDrawerNow = () => {
     this.props.navigation.toggleDrawer()
   }

   editProfileCallBack = () => {
     this.setState({showEditModal: true})
   }

   saveEdit = () => {
     if(this.state.firstName == "" || this.state.lastName == "" || this.state.height == "" || this.state.weight == ""){
       this.setState({isError: true, errmsg: "Fields can not be empty"})
     } else {
       this.setState({isError: false, errmsg: '', loading: true})
       let data = {
         userid: userdata._id,
         first_name: this.state.firstName,
         last_name: this.state.lastName,
         height: this.state.height,
         weight: this.state.weight
       }
       this.props.update_profile(data)
     }
    
   }

  render() {
  //  let userdata = JSON.parse(this.state.userData)
    
    return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showEditModal}
            onRequestClose={() => {
              this.setState({showEditModal: false})
            }}> 
              <View style={design.popup_modal}>
               <View style={[design.popup_view, {height: 350}]}>

                <View style={[{flexDirection: 'row'}, design.popup_head]}>
                  <View style={{marginTop: 9}}>
                    <Icon
                      name="edit"
                      type='MaterialIcons'
                      color='#fff'
                      size = {18}
                    />
                  </View>
                  <View>
                    <Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Edit profile</Text>
                  </View>
                </View>
                
                <View style={styles.from_row}>
                  <View style={{width: '45.5%', marginLeft: '5%'}}>
                    <Item stackedLabel style={styles.field} error={this.state.firstNameErr ? true : false} >
                      <Label style={styles.fields}>Name</Label>
                      <Input 
                        style={styles.input_text}
                        value={this.state.firstName}
                        onChangeText={(firstName) => firstName == "" ? this.setState({firstName, firstNameErr: true}) : this.setState({firstName, firstNameErr: false}) }
                      />
                    </Item>
                  </View>

                 <View style={{width: '45.5%'}}>
                  <Item stackedLabel style={styles.field} error={this.state.lastNameErr ? true : false}>
                      <Label style={styles.fields}>Lastname</Label>
                      <Input
                        style={styles.input_text}
                        value={this.state.lastName}
                        onChangeText={(lastName) => lastName == "" ? this.setState({lastName, lastNameErr: true}) : this.setState({lastName, lastNameErr: false}) }
                      />
                    </Item>
                  </View>
                </View>

                <View style={styles.from_row}>
                  <View style={{width: '45.5%', marginLeft: '5%'}}>
                    <Item stackedLabel style={styles.field} error={this.state.heightErr ? true : false}>
                      <Label style={styles.fields}>Height (cm)</Label>
                      <Input 
                        style={styles.input_text}
                        keyboardType="phone-pad"
                        maxLength={3}
                        value={this.state.height}
                        onChangeText={(height) => height == "" ? this.setState({height, heightErr: true}) : this.setState({height, heightErr: false}) }
                      />
                    </Item>
                  </View>

                  <View style={{width: '45.5%'}}>
                  <Item stackedLabel style={styles.field} error={this.state.weightErr ? true : false}>
                      <Label style={styles.fields}>Weight (kg)</Label>
                      <Input
                        style={styles.input_text}
                        value={this.state.weight}
                        keyboardType="phone-pad"
                        maxLength={3}
                        onChangeText={(weight) => weight == "" ? this.setState({weight, weightErr: true}) : this.setState({weight, weightErr: false}) }
                      />
                    </Item>
                  </View>
                </View>
                
                {this.state.isError && 
                  <Text style={design.err_text}>{this.state.errmsg}</Text>
                }

                <View style={[design.always_center, {marginTop: 25}]}>
                  {this.state.loading ?
                    <ActivityIndicator style={{marginBottom: '5%'}} size="large" color="green" />
                    :
                    <TouchableOpacity onPress={this.saveEdit} style={design.default_submit_button}>
                     <Text style={design.default_submit_button_text}> Save </Text>
                    </TouchableOpacity>
                  }
                </View>
               

               </View>
              </View>
            </Modal>
            
          <Profile showEdit = {() => this.editProfileCallBack()} nav={this.props.navigation} userdata={this.state.userData} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  from_row: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '5%',
    paddingTop: 10
  },
  fields: {
    textAlign: 'left',
    fontSize: 16,
  },
  field: {
    zIndex: 9999,
  },
  input_text: {
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
  }
})

function mapStateToProps(state) {
  return {
    userdata: state.fbuserData
  }
}

export default connect(mapStateToProps, {update_profile})(Profile_Screen);
