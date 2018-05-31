import './index.html';
import './index.scss';
import { storageData } from '../common/index.js';
import * as Babel from '@babel/standalone';
import _ from 'lodash';

const transformInput = document.getElementById('transform-function');
const urlInput = document.getElementById('url');
const saveButton = document.getElementById('save-button');
const syntaxErrorHelp = document.getElementById('syntax-error');

window.onload = () => {
  chrome.storage.local.get(storageData, (data) => {
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

    chrome.storage.local.set(settings, _.noop);
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
