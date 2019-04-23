import TronWeb from 'tronweb'
import * as config from './../credentials'
import Apis from './../../actions/common_action'


const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(config.fullNode);
const solidityNode = new HttpProvider(config.solidityNode);
const fullNode_test = new HttpProvider(config.fullNode_test);
const solidityNode_test = new HttpProvider(config.solidityNode_test);
const privateKey = config.privateKey
const myaddress = config.myAddress
const tronWeb = new TronWeb(fullNode, solidityNode)
tronWeb.setPrivateKey(privateKey)

const TRAN_ID = '1000239' //TRAN TOKEN (TRC10)
//const TRAN_ID = '1000274' //MY TESTING TOKEN ID

//MY-TEST Account
//tronWeb.setAddress('TQUnSEm7C5jMWsbG1U9Zx5UapXM6uXsvjA');


// 3CO-Network Address
tronWeb.setAddress('THDz6hTkGSRrLur4KS2HN2h4AnBMc4YX4F');

export const getAddress =  (address) => {
   return new Promise((resolve, reject) => {
    tronWeb.trx.getAccount(address, (err, res) => {
      if (!err){
        resolve(res)
      } else {
        reject(new Error(err))
      }
    })
   })
}

export const toSha3 =  (address) => {
  return new Promise((resolve, reject) => {
    tronWeb.address.fromHex('419f29bbb733807ab5b61976928e68482d78c97ed8', (err, res) => {
     if (!err){
       console.log('tromn', res);
       
       resolve(res)
     } else {
       reject(new Error(err))
     }
   })
  })
}


export const sendToken =  (toAddress, tokens, userid, isInitial) => {
 return new Promise((resolve, reject) => {
   tronWeb.trx.sendToken(toAddress, tokens, TRAN_ID, privateKey, (error, response) => {
    if (!error) {
      if(isInitial == true) {
        resolve(response)
      } else {
        let transaction = {
          userid,
          tokens: tokens,
          toAddress,
          transaction_id: response.transaction.txID
        }
        Apis.save_transaction(transaction).then((res) => res.json())
        .then((tdata) => {
          tdata.status == 200 
           resolve(response) 
        })
      }
      
    } else {
      reject(error)
    }
  });
 }) 
}




// this.tronWeb.trx.sendTransaction("TQUnSEm7C5jMWsbG1U9Zx5UapXM6uXsvjA", 10, this.privetKey, (error, userBalance) => {
    //   if(error)
    //     return console.log(error);

    //   console.log(`User's balance is:`, userBalance);
    //   });

    //   this.tronWeb.trx.sendToken("TQUnSEm7C5jMWsbG1U9Zx5UapXM6uXsvjA", 5, "1000239", this.privateKey, (error, userBalance) => {
    //     if(error)
    //       return console.log(error);
    //     console.log(`User's balance is:`, userBalance);
    //     });

    // this.tronWeb.createAccount((err, res) => {
    //     console.log('acc', res);

    // })