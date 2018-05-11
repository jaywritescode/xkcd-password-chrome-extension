const passwordText = document.getElementById('xkcd-password');
const reloadBtn = document.getElementById('get-password');

const getPassword = () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status == 200) {
      passwordText.value = xhr.response;
    }
  };
  xhr.open("GET", "https://xkcd-password.herokuapp.com", true);
  xhr.send();
};

window.onload = getPassword;
reloadBtn.onclick = getPassword;
