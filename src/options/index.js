import './index.html';
import './index.scss';

const transformInput = document.getElementById('functionInput');
const urlInput = document.getElementById('urlInput');
const saveButton = document.getElementById('saveButton');

const noop = function() {};

window.onload = () => {
  chrome.storage.local.get(['transform', 'url'], (data) => {
    if (data.transform) {
      transformInput.value = data.transform;
    }
    if (data.url) {
      urlInput.value = data.url;
    }
  });
};

saveButton.onclick = () => {
  chrome.storage.local.set({
    transform: transformInput.value,
    url: urlInput.value,
  }, noop);
};
