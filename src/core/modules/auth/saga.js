import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  authActionCreators,
  LOGIN_REQUEST
} from './actions';

import { ApiService } from '../../../services';

export function* asyncLoginRequest({ payload, resolve, reject }) {
  const { email, password } = payload;
  try {
    const response = yield call(ApiService,
      {
        api: `/admin/signin`,
        method: 'POST',
        params: {
          email: email,
          password: password
        }
      });
    // @TODO: Open next lines after login api is completed
    if (response.status === 200) {
      yield put(authActionCreators.loginSuccess({ user: response.data }));
      resolve(response);
    } else {
      reject(response.msg);
    }
  } catch (e) {
    reject(e);
  }
}


export function* watchLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    yield* asyncLoginRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchLoginRequest)
  ]);
}
