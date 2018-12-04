import { combineReducers } from 'redux';

import {
  auth,
  wallet
} from '../modules';

const rootReducer = combineReducers({
  auth,
  wallet
});

export default rootReducer;
