let dataSetting = {
  start: false,
  duration: 120,
  notification: false,
  tabID: 0,
  reloadCounter: 0,
};
let timerID = 0;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender);
  console.log(request);
  console.log(dataSetting);
  if (request.idMessage === 123) {
    dataSetting.tabID = sender.tab.id;
  } else if (request.idMessage === 241) {
    chrome.notifications.create("NOTIFICATION_ID12", {
      type: "basic",
      iconUrl: "../images/icon128.png",
      title: "Monoty - New Message",
      message: dataSetting.reloadCounter.toString(),
      priority: 2,
    });
  } else {
    console.log("executing popup command");
    if (dataSetting.tabID !== 0) {
      console.log("executing popup command after checking tabID");
      if (request.idMessage === 333) {
        dataSetting.duration = request.duration;
        dataSetting.start = request.start;
        dataSetting.notification = request.notification;
        timerID = setInterval(function () {
          if (dataSetting.start) {
            console.log("Reloading");
            dataSetting.reloadCounter += 1;
            chrome.tabs.reload(dataSetting.tabID);
            chrome.runtime.sendMessage({
              idMessage: 645,
              info: dataSetting,
            });
          }
        }, dataSetting.duration * 1000);
        //for not creating multiple time interval
        for (let i = 1; i < timerID; i++) {
          clearInterval(i);
        }
      } else {
        dataSetting.notification = request.notification;
      }
    } else console.log("Failed to update tabID" + " - " + dataSetting.tabID);
  }

  sendResponse("Event Listener Executed");
});

chrome.tabs.onRemoved.addListener((closingTabID) => {
  if (dataSetting.tabID === closingTabID) {
    clearInterval(timerID);
  }
});

console.log("Background worker is on");
