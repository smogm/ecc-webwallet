const keythereum = require("keythereum");

export const exportKeyStore = (privateKey, password) => {
  let params = { keyBytes: 32, ivBytes: 16 };
  let options = {
    kdf: "pbkdf2",
    cipher: "aes-128-ctr",
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: "hmac-sha256"
    }
  };
  
  let dk = keythereum.create(params);
  let keyObject = keythereum.dump(password, privateKey, dk.salt, dk.iv, options);
  let resJson = keythereum.exportToFile(keyObject);
  return resJson;
}

export const importKeyStore = (password, keyStoreData) => {
  let keyJsonObj =  JSON.parse(JSON.parse(keyStoreData));
  return new Promise(function(resolve, reject) {
    keythereum.recover(password, keyJsonObj, (privateKey) => {
      if (privateKey.length)
        resolve(privateKey);
      else
        reject('not matched');
    });
  });
}
