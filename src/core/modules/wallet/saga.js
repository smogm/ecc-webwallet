import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  walletActionCreators,
  WALLET_CREATE_REQUEST,
  BALANCE_REQUEST,
  UTXOS_REQUEST
} from './actions';

import { ApiService } from '../../../services';

export function* asyncCreateWalletRequest({ payload, resolve, reject }) {
  try {
    yield put(walletActionCreators.createWallet(payload));
    resolve('success');
  } catch (e) {
    reject(e);
  }
}

export function* asyncWalletBalanceRequest({ payload, resolve, reject }) {
  const { address } = payload;
  try {
    const response = yield call(ApiService,
      {
        api: `https://www.coinexplorer.net/api/v1/BITG/address/balance?address=${address}`,
        third_party: true,
        method: 'GET',
        params: {}
      });
    if (response.data.success) {
      yield put(walletActionCreators.getBalanceSuccess({ balance: response.data.result[address] }));
      resolve(response.result);
    } else {
      yield put(walletActionCreators.getBalanceFailure({ balance: 0 }));
      reject(response.data.error);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncWalletUtxoRequest({ payload, resolve, reject }) {
  const { address } = payload;
  try {
    const response = yield call(ApiService,
      {
        api: `https://www.coinexplorer.net/api/v1/BITG/address/unspent?address=${address}`,
        third_party: true,
        method: 'GET',
        params: {}
      });
    if (response.data.success) {
      yield put(walletActionCreators.getUtxosSuccess({ utxos: response.data.result }));
      resolve(response.result);
    } else {
      yield put(walletActionCreators.getUtxosFailure({ utxos: [] }));
      reject(response.data.error);
    }
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

export function* watchWalletBalanceRequest() {
  while (true) {
    const action = yield take(BALANCE_REQUEST);
    yield* asyncWalletBalanceRequest(action);
  }
}

export function* watchWalletUtxosRequest() {
  while (true) {
    const action = yield take(UTXOS_REQUEST);
    yield* asyncWalletUtxoRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchCreateWalletRequest),
    fork(watchWalletBalanceRequest),
    fork(watchWalletUtxosRequest)
  ]);
}
