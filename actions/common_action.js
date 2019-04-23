import { NetworkConstants } from '../config/appConstants'
import qs from 'qs'


class Apis {


  static saveWallet = (data) => {
    return fetch(NetworkConstants.RequestUrl('save_wallet'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(data)
    })
  }

  static get_user = (userid) => {
    return fetch(NetworkConstants.RequestUrl('get_user'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({userid})
    })
  }

  static save_transaction = (transfer) => {
    return fetch(NetworkConstants.RequestUrl('save_transfer'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(transfer)
    })
  }

  static get_debited_tokens = (userid) => {
    return fetch(NetworkConstants.RequestUrl('total_debited_token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({userid})
    })
  }

  static get_transfer_history = (userid) => {
    return fetch(NetworkConstants.RequestUrl('transfer_history'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({userid})
    })
  }

  static validate_transfer = (data) => {
    return fetch(NetworkConstants.RequestUrl('validate_transfer'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(data)
    })
  }



}
export default Apis