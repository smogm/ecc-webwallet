import {
  WALLET_CREATE_REQUEST
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
    default: {
      return state;
    }
  }
}
