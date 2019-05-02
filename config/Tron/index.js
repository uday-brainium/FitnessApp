import Apis from './../../actions/common_action'
let ls = require('react-native-local-storage');


export const getAddress =  (address) => {
   return new Promise((resolve, reject) => {
    let token = new Promise((resolve, reject) => {
      ls.get('auth-token').then(token => {
        resolve(token)
      })
    }) 
    token.then(auth => {
      Apis.get_address(address, auth)
      .then(res => res.json())
      .then(response => {
        if(response.status == 200) {
          resolve(response.message)
        } else {
          reject(response.message)
        }
      })
    })
   
   })
}


export const sendToken =  (toAddress, tokens, userid, isInitial) => {
 return new Promise((resolve, reject) => {
  Apis.send_tran(toAddress, tokens)
  .then(res => res.json())
  .then(response => {

    if(response.status == '200') {
      if(isInitial == true) {
        resolve(response.response)
      } else {
        let transaction = {
          userid,
          tokens: tokens,
          toAddress,
          transaction_id: response.response.transaction.txID
        }
        Apis.save_transaction(transaction).then((res) => res.json())
        .then((tdata) => {
          tdata.status == 200 
           resolve(response.response) 
        })
      }
    } else {
      reject(error)
    }

  });
 }) 
}

