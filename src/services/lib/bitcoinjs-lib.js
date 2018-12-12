const bitcoin = require('bitcoinjs-lib');

export const generateAddress = () => {
  const keyPair = bitcoin.ECPair.makeRandom({ rng: rng });
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const privateKey = keyPair.privateKey;
  return { address: address, privateKey: privateKey };
}

export const importAddressFromPrivateKey = (privateKey) => {
  const keyPair = bitcoin.ECPair.fromPrivateKey(privateKey);
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return address;
}

function rng() {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz012345";

  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return Buffer.from(text);
}