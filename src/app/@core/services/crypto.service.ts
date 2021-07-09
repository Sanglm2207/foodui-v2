import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  secretKey = "YourSecretKeyForEncryption&Descryption";
  constructor() { }

  encrypt(value : string) : string{
    return crypto.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return crypto.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(crypto.enc.Utf8);
  }
}
