const keythereum = require('keythereum');

export const exportKeyStore = (privateKey, password) => {
  const params = { keyBytes: 32, ivBytes: 16 };
  const options = {
    kdf: 'pbkdf2',
    cipher: 'aes-128-ctr',
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: 'hmac-sha256',
    },
  };

  const dk = keythereum.create(params);
  const keyObject = keythereum.dump(password, privateKey, dk.salt, dk.iv, options);
  const resJson = keythereum.exportToFile(keyObject);
  return resJson;
};

export const importKeyStore = (password, keyStoreData) => {
  const keyJsonObj =  JSON.parse(JSON.parse(keyStoreData));
  return new Promise(resolve => {
    keythereum.recover(password, keyJsonObj, privateKey => {
      if (privateKey.length) {
        resolve(privateKey);
      } else {
        resolve(null);
      }
    });
  });
};
