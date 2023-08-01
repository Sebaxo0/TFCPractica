declare var require: any;
import * as CryptoJS from 'crypto-js'

import { Injectable } from '@angular/core';

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = '{![G!R*mTLi,c&6]*.iP3?/DL,wu%Z!QVUh8qfxbiBrx{)n+)/-{{SABS6t?6(QUKVFUGu6TXF:;$D?2F=Eg9iHJk+S$&u**Yzp,ymk)tj(,e.f%.LbfVN8H';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });

}
