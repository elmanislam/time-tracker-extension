/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-06-23 11:10:13


*********************************************/

let domList;
let currentDomainName;
chrome.storage.local.get(["domList"]).then((result) => {
  domList = result.domList;
});

chrome.storage.local.get(["currentDomainName"]).then((result) => {
  currentDomainName = result.currentDomainName;
  document.getElementById("domainName").textContent = currentDomainName;

  let currentDom = domList[currentDomainName];
  console.log(currentDom);
  document.getElementById("time").textContent = currentDom.totalTime;
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("send").addEventListener("click", function () {
    chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
      console.log(response.farewell);
    });
  });
});
