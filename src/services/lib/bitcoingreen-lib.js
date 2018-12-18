// import axios from 'axios';
import { config } from '../../config';
// import { apiEndpoint } from '../constants';

const bitcoin = require('bitcoingreenjs-lib-test'); // ToDo: This package is test lib. It should be updated with released bitcoingreenjs-lib

function randomStr() {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz012345';

  for (let i = 0; i < 32; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return Buffer.from(text);
}

export const generateAddress = () => {
  const keyPair = bitcoin.ECPair.makeRandom({ rng: randomStr });
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const { privateKey } = keyPair;
  return { address, privateKey };
};

export const importAddressFromPrivateKey = privateKey => {
  const keyPair = bitcoin.ECPair.fromPrivateKey(privateKey);
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return address;
};

export const setTransaction = (txUtxos, txUtxoValue, amount, receiveAddress, senderAddress, privateKey) => {
  const rawTransaction = new bitcoin.TransactionBuilder();
  const keyPair = bitcoin.ECPair.fromPrivateKey(privateKey);
  for (let i = 0; i < txUtxos.length; i += 1) {
    rawTransaction.addInput(txUtxos[i].txid, txUtxos[i].vout);
  }
  const change = txUtxoValue - amount - config.FEE_AMOUNT;
  rawTransaction.addOutput(receiveAddress, parseInt(+amount * (10 ** 8), 10));
  rawTransaction.addOutput(senderAddress, parseInt(+change * (10 ** 8), 10));
  for (let i = 0; i < txUtxos.length; i += 1) {
    rawTransaction.sign(i, keyPair);
  }
  return rawTransaction;
};

export const submitTransaction = rawTransaction => {
  const txHex = rawTransaction.build().toHex();
  console.log('txHex', txHex);
  // const url = apiEndpoint;
  // const params = {
  //   raw: txHex,
  //   allowhighfees: false,
  //   swifttx: false,
  // };
  // return new Promise((resolve, reject) => {
  //   axios({
  //     method: 'post',
  //     url,
  //     data: {
  //       params,
  //     },
  //   }).then(res => {
  //     resolve(res);
  //   }).catch(err => {
  //     console.log('error', err);
  //     reject(err);
  //   });
  // });
};
