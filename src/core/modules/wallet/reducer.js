import {
  WALLET_CREATE_REQUEST,
  BALANCE_REQUEST_SUCCESS,
  UTXOS_REQUEST_SUCCESS
} from './actions';
import { initialState } from '../initialState';

export default function wallet(state = initialState.wallet, action = {}) {
  const { type, payload } = action;
  
  switch (type) {
    case WALLET_CREATE_REQUEST: {
      return {
        ...state,
        address: payload.address
      }
    }
    case BALANCE_REQUEST_SUCCESS: {
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
    default: {
      return state;
    }
  }
}
