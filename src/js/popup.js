const passwordText = document.getElementById('xkcd-password');
const reloadBtn = document.getElementById('get-password');
const copyBtn = document.getElementById('copy');

const getPassword = () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status == 200) {
      transform(xhr.response, (value) => {
        passwordText.value = value;
      });
    }
  };
  //  xhr.open("GET", "https://xkcd-password.herokuapp.com", true);
  xhr.open("GET", "http://localhost:9292", true);
  xhr.send();
};

// TODO: default transform function
function transform(words, callback) {
  chrome.storage.local.get('transform', (data) => {
    let fn = Function('words', `"use strict";return ${data.transform};`);
    callback(fn.call(null, words));
  });
}

window.onload = getPassword;
reloadBtn.onclick = getPassword;

copyBtn.onclick = () => {
  window.navigator.clipboard.writeText(passwordText.value).then(() => {
    // TODO: better interface
    console.log('copied successfully');
  });
  // TODO: handle fail condition
};
