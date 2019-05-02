import {StyleSheet, Dimensions} from 'react-native'

export const design = StyleSheet.create({
    white_medium_text: {
        color: '#fff',
        fontSize: 18,
    },
    token_text: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center'
    },
    heart_text: {
      position: 'absolute',
      width: 50,
      top: 55,
      left: 37,
      justifyContent: 'center',
      alignItems: 'center'
    },
    med_center_text: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5
    },
    white_small_text: {
      color: '#fff',
      fontSize: 14,
      textAlign: 'center'
    },
    popup_modal: {
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, height: Dimensions.get('window').height + 20
    },
    popup_view: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 0,
      borderRadius: 10,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowOffset: {
      height: 1,
      width: 0
      },
      elevation: 10
      },
    popup_head: {
      padding: 10, 
      backgroundColor: '#c6a0f5', 
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    default_submit_button: {
      padding: 10,
      width: '50%',
      backgroundColor: '#2FDA54',
      borderRadius: 20,
    },
    default_submit_button_text: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold'
    },
    always_center: {
      justifyContent:'center',
      alignItems: 'center'
    },
    err_text: {
      color:'red',
      textAlign: 'center',
      fontSize: 16
    },
    top_btn: {
      padding: 8,
      backgroundColor: '#c6a0f5',
      borderRadius: 10,
      borderBottomLeftRadius: 0
    },
    top_btn_right: {
      padding: 8,
      backgroundColor: '#c6a0f5',
      borderRadius: 10,
      borderBottomRightRadius: 0
    },
    top_btn_text: {
      color: '#fff',
      fontSize: 18,
    },
    common_row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    circle_view: {
     // height: 120,
     // width: 120,
     // borderRadius: 100,
      overflow: 'hidden'
    },
    green_bullet: {
      height: 10,
      width: 10,
      backgroundColor: '#2dcb6e',
      borderRadius: 20,
      marginRight: 2,
      marginTop: 10
    },
    red_bullet: {
      height: 10,
      width: 10,
      backgroundColor: 'red',
      borderRadius: 20,
      marginRight: 2,
      marginTop: 10
    }
})