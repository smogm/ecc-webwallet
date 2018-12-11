import {
  WALLET_CREATE_REQUEST,
  BALANCE_REQUEST_SUCCESS,
  BALANCE_REQUEST_FAILURE,
  UTXOS_REQUEST_SUCCESS,
  UTXOS_REQUEST_FAILURE
} from './actions';
import { initialState } from '../initialState';

export default function wallet(state = initialState.wallet, action = {}) {
  const { type, payload } = action;
  
  switch (type) {
    case WALLET_CREATE_REQUEST: {
      return {
        ...state,
        address: payload.address,
        privateKey: payload.privateKey
      }
    }
    case BALANCE_REQUEST_SUCCESS: {
      return {
        ...state,
        balance: payload.balance
      }
    }
    case BALANCE_REQUEST_FAILURE: {
      return {
        ...state,
        balance: payload.balance
      }
    }
    case UTXOS_REQUEST_SUCCESS: {
      return {
        ...state,
        utxo: payload.utxos
      }
    }
    case UTXOS_REQUEST_FAILURE: {
      return {
        ...state,
        utxo: payload.utxos
      }
    }
    default: {
      return state;
    }
  }
}
