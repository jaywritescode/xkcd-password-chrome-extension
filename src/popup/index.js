import './index.html';
import './index.scss';

const passwordText = document.getElementById('xkcd-password');
const reloadBtn = document.getElementById('get-password');
const copyBtn = document.getElementById('copy');

(function() {
  chrome.storage.local.get(['transform', 'url'], data => {
    window.onload = getPassword(data);
    reloadBtn.onclick = getPassword(data);
  });
})();

const getPassword = ({transform, url = "http://xkcd-password.jayharris.info"}) => {
  const transformFn = getTransform(transform) || Array.prototype.join;

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status == 200) {
      passwordText.value = transformFn(xhr.response);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

const getTransform = code => code && Function('words', `"use strict";return ${code};`);

copyBtn.onclick = () => {
  window.navigator.clipboard.writeText(passwordText.value).then(() => {
    // TODO: better interface
    console.log('copied successfully');
  });
  // TODO: handle fail condition
};
