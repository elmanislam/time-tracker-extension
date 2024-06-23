/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-06-23 16:02:18


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
  console.log("current Dom: ", currentDom);
  document.getElementById("time").textContent = currentDom.totalTime;
});

function makeDomainCard() {
  let currentDom = domList[currentDomainName];
  const domainCard = document.createElement("div");
  domainCard.classList.add("domain-card");

  // create img tag for icon
  const icon = document.createElement("div");
  icon.setAttribute("src", currentDom.icon);
  icon.classList.add("icon-16");
  domainCard.appendChild(icon);
  document.body.appendChild(domainCard);
}
/*
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("send").addEventListener("click", function () {
    chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
      // console.log(response.farewell);
    });
  });
}); */
