import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,Dimensions, Image
} from 'react-native';
import { connect } from 'react-redux'
import { update_profile_img } from './../../actions/fbLogin_action'
import { Colors } from './../../config/theme'
let ls = require('react-native-local-storage');
import { Icon } from 'react-native-elements'
import PhotoUpload from 'react-native-photo-upload'
import { base_url } from './../../config/appConstants'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {}
    }
  }

  componentDidMount() {
    ls.get('userdata').then((data) => {
      this.setState({profileInfo: JSON.parse(data)})
    })
  }

  componentWillReceiveProps(nextProps) {
     ls.get('userdata').then((data) => {
      this.setState({profileInfo: JSON.parse(data)})
    })
  }


  render() {
    return (
      <View>
        <View style={{ left: '80%', top: '2%', position: 'absolute', zIndex: 9999}}>
          <Icon
              name="edit"
              type='MaterialIcons'
              color='#000000'
              raised
              reverseColor="black"
              underlayColor="#1fcbbf"
              onPress ={() => this.props.showEdit()}
              size = {20}
            />
        </View>
         <View style={styles.container}>          
            <View style={styles.profile_image_part}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
             <View style={styles.image_container}>
             {this.state.profileInfo.user_type == 'facebook' &&
                <Image
                  style={{
                    paddingVertical: 30,
                    width: 178,
                    height: 178,
                    borderRadius: 75
                  }}
                  resizeMode='cover'
                  source={{uri: 'http://graph.facebook.com/'+this.state.profileInfo.social_id+'/picture?type=large' }}
                />
             }
             {this.state.profileInfo.user_type == 'Normal' &&
              <PhotoUpload
                onPhotoSelect={avatar => {
                  if (avatar) {
                    let data = {
                      userid: this.state.profileInfo._id,
                      base_64: avatar
                    }
                    this.props.update_profile_img(data)
                  }
                }}
              >
               
                <Image
                  style={{
                    paddingVertical: 30,
                    width: 178,
                    height: 178,
                    borderRadius: 75
                  }}
                  resizeMode='cover'
                  source={
                    this.state.profileInfo.image_url == "" ?
                    require('./../../assets/images/app-icon.png') :
                    {uri: `${base_url}${this.state.profileInfo.image_url}`}
                     }
                />
              </PhotoUpload>
             }
             </View>
            </View>

             <View style={styles.name}>
             {this.state.profileInfo.user_type == 'facebook' ?
              <Text style={styles.username}>{this.state.profileInfo.name}</Text> :
              <Text style={styles.username}>{this.state.profileInfo.name_first} {this.state.profileInfo.name_last}</Text>
             }
  
              
              <Image style={styles.line} source={require('./../../assets/images/Line17.png')}/>
              <Text style={styles.email}>{this.state.profileInfo.email}</Text>
             </View>

             <View style={styles.profile_details}>
                <View style={styles.left_part}>
                    <Text style={styles.details_head_text}>My Height</Text>
                    <Text style={styles.details_text}> {this.state.profileInfo.height} cm</Text>
                </View>

                <View style={styles.verticle_line}>
                <Text> </Text>
                 <Image style={styles.line2} source={require('./../../assets/images/Line18.png')}/>
                 <Text> </Text>
                </View>


                <View style={styles.right_part}>
                 <Text style={styles.details_head_text}>My Weight</Text>
                 <Text style={styles.details_text}> {this.state.profileInfo.weight} kg </Text>
                </View>
             </View>

            </View>
         </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
      container: {
        width: Dimensions.get('window').width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: Colors.background,
      },
      bg_icon: {
        position: 'absolute',
        top: 20,
        width: 100,
        height: 100,
        left: 10
      },
      profile_image_part: {
          paddingTop: '2%',
          justifyContent: 'center'

      },

      image_container: {
        justifyContent:'center',
        alignItems: 'center',
        width: 170,
        height:170,
        borderRadius: 100,
        elevation: 1,
        overflow: 'hidden'
      },
      profile_image: {
         width:  180,
         height: 180,
         paddingBottom: 10,
      },
      username: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
      },
      line: {
        width: '100%',
        height: 10,
        paddingTop: 15,
        paddingBottom: 15
      },
      line2: {
        width: '100%',
        height: 100
      },
      name: {
        //paddingTop: '4%',
        //paddingBottom: '4%'
      },
      email: {
        fontSize: 20,
        color: 'gray',
        textAlign: 'center'
      },
      profile_details: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      left_part: {
        padding: 15,
        paddingRight: 25,
      },
      right_part: {
        padding: 15,
        paddingLeft: 25
      },
      details_head_text: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center'
      },
      details_text: {
        fontSize: 19,
        color: 'gray',
        textAlign: 'center'
      },
      verticle_line: {
        zIndex: 99,

      }
    })

function mapStateToProps(state) {
  return {
    userData: state.fbuserData
  }
}

export default connect(mapStateToProps, {update_profile_img})(Profile)
