import cryptoJs from 'crypto-js';
import { AES_SECRET } from './constants';

const iv = AES_SECRET.slice(0, 16);

export const encrypt = (text: string) => {
  const cipher = cryptoJs.AES.encrypt(text, cryptoJs.enc.Utf8.parse(AES_SECRET), {
    iv: cryptoJs.enc.Utf8.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC,
  });

  return cipher.toString();
};

export const decrypt = (encryptedText: string) => {
  const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(AES_SECRET), {
    iv: cryptoJs.enc.Utf8.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC,
  });

  return decipher.toString(cryptoJs.enc.Utf8);
};
