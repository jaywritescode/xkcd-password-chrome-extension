import './index.html';
import './index.scss';

const transformInput = document.getElementById('transform-function');
const urlInput = document.getElementById('url');
const saveButton = document.getElementById('save-button');

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
  const settings = {
    code: transformInput.value,
    url: urlInput.value,
  };

  console.log('settings: %O', settings);
  chrome.storage.local.set(settings, noop);
};
