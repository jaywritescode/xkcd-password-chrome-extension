import './index.html';
import './index.scss';
import * as Babel from '@babel/standalone';

const transformInput = document.getElementById('transform-function');
const urlInput = document.getElementById('url');
const saveButton = document.getElementById('save-button');
const syntaxErrorHelp = document.getElementById('syntax-error');

const noop = function() {};

window.onload = () => {
  chrome.storage.local.get(['code', 'url'], (data) => {
    console.log('chrome.storage.local: %O', data);
    if (data.code) {
      transformInput.value = data.code;
    }
    if (data.url) {
      urlInput.value = data.url;
    }
  });
};

saveButton.onclick = () => {
  try {
    Babel.transform(transformInput.value, { presets: [] });

    hideSyntaxError();

    const settings = {
      code: transformInput.value,
      url: urlInput.value,
    };

    chrome.storage.local.set(settings, noop);
  }
  catch (e) {
    showSyntaxError();
  }
};

function showSyntaxError() {
  transformInput.classList.add('is-danger');
  transformInput.nextElementSibling.classList.replace('is-invisible', 'has-danger-text');
  syntaxErrorHelp.classList.replace('is-invisible', 'is-danger');
}

function hideSyntaxError() {
  transformInput.classList.remove('is-danger');
  transformInput.nextElementSibling.classList.replace('has-danger-text', 'is-invisible');
  syntaxErrorHelp.classList.replace('is-danger', 'is-invisible');
}
