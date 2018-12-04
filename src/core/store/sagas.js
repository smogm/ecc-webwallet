// @flow

import { fork, all } from 'redux-saga/effects';
import {
  authSaga,
  walletSaga
} from '../modules';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(walletSaga)
  ]);
}
