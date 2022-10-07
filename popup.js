const buttonSubmit = document.getElementById("buttonSubmit");
const duration = document.getElementById("duration");
const notificationSpan = document.getElementById("notificationState");
const reloadSpan = document.getElementById("reloadNumber");

const sendStart = function () {
  console.log("Clicked Submit");
  chrome.runtime.sendMessage(
    {
      idMessage: 333,
      duration: parseInt(duration.value),
      notification: true,
      start: true,
    },
    function (response) {
      console.log(response);
    }
  );
};

buttonSubmit.addEventListener("click", sendStart);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.idMessage === 645) {
    notificationSpan.innerText = request.info.notification;
    reloadSpan.innerText = request.info.reloadCounter;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      notificationSpan.innerText = true;
      chrome.runtime.sendMessage({
        idMessage: 331,
        notification: true,
      });
      console.log("Checked");
    } else {
      notificationSpan.innerText = false;
      chrome.runtime.sendMessage({
        idMessage: 331,
        notification: false,
      });
      console.log("Not checked");
    }
  });
});
