console.log("On Guesty Page");

chrome.runtime.sendMessage({ idMessage: 123 });

const getValue = (que) => {
  data = document.querySelector(que);
  if (data) return data.innerText;
  return "null";
};

window.addEventListener("load", (event) => {
  console.log("page element is fully loaded");
  let o = 0;
  let TimerID = setInterval(() => {
    let data = getValue('[data-testid="nav-bar-link-label"]');
    console.log(data);
    if (parseInt(data) >= 1 || o === 15) {
      clearInterval(TimerID);
      console.log("Found that element");
      chrome.runtime.sendMessage({ idMessage: 241 });
    }
  }, 4000);
});
