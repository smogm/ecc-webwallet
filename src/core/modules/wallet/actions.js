import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const WALLET_CREATE_REQUEST = 'wallet/WALLET_CREATE_REQUEST';
/**
 * Action Creators
 */
export const walletActionCreators = {
  createWallet: createPromiseAction(WALLET_CREATE_REQUEST)
};
