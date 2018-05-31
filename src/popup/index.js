import './index.html';
import './index.scss';
import { storageData, defaultUrl } from '../common/index.js';
import _ from 'lodash';

const passwordText = document.getElementById('xkcd-password');
const reloadBtn = document.getElementById('get-password');
const copyBtn = document.getElementById('copy');

(function() {
  chrome.storage.local.get(storageData, data => {
    console.log(data);

    const { code } = data;
    const url = data.url || defaultUrl;

    const getPassword = () => {
      const fn = code ?
            Function('words', `"use strict";return ${code};`) :
            Array.prototype.join;

      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.onload = () => {
        if (xhr.status == 200) {
          console.log('response: %O', xhr.response);
          passwordText.value = fn.call(xhr.response);
        }
      };
      console.log('querying %s', url);
      xhr.open("GET", url, true);
      xhr.send();
    };

    window.onload = getPassword;
    reloadBtn.onclick = getPassword;
  });
})();

copyBtn.onclick = () => {
  window.navigator.clipboard.writeText(passwordText.value).then(() => {
    // TODO: better interface
    console.log('copied successfully');
  });
  // TODO: handle fail condition
};
