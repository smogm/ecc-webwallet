import {
  put,
  // call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  walletActionCreators,
  WALLET_CREATE_REQUEST
} from './actions';

// import { ApiService } from '../../../services';

export function* asyncCreateWalletRequest({ payload, resolve, reject }) {
  try {
    yield put(walletActionCreators.createWallet(payload));
    resolve('success');
  } catch (e) {
    reject(e);
  }
}


export function* watchCreateWalletRequest() {
  while (true) {
    const action = yield take(WALLET_CREATE_REQUEST);
    yield* asyncCreateWalletRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchCreateWalletRequest)
  ]);
}
