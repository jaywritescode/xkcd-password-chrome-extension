import './index.html';
import './index.scss';
import { storageData, defaultUrl } from '../common/index.js';
import _ from 'lodash';

const passwordText = document.getElementById('xkcd-password');
const reloadBtn = document.getElementById('get-password');
const copyBtn = document.getElementById('copy');

const init = () =>  {
  chrome.storage.local.get(storageData, data => {
    const { code, url } = data;

    transformFn = code ?
      Function('words', `"use strict";return ${code};`) :
      Array.prototype.join;

    const requestPassword = () => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.onload = () => {
        if (xhr.status == 200) {
          passwordText.value = transformFn.call(this, xhr.response);
        }
      };
      xhr.open("GET", url || defaultUrl, true);
      xhr.send();
    };

    reloadBtn.addEventListener('click', requestPassword);
    requestPassword();
  });
}

copyBtn.onclick = () => {
  window.navigator.clipboard.writeText(passwordText.value).then(() => {
    // TODO: better interface
    console.log('copied successfully');
  });
  // TODO: handle fail condition
};

document.addEventListener('DOMContentLoaded', init);
