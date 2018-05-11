const input = document.getElementById('functionInput');
const saveButton = document.getElementById('saveButton');

saveButton.onclick = () => {
  chrome.storage.local.set({transform: input.value}, () => {
    console.log("'transform' value set: %O", input.value);
  });
};
