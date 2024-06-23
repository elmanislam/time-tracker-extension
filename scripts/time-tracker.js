/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-06-23 16:22:22


*********************************************/

let domList;
let currentDomainName;
chrome.storage.local.get(["domList"]).then((result) => {
  domList = result.domList;
});

chrome.storage.local.get(["currentDomainName"]).then((result) => {
  currentDomainName = result.currentDomainName;
  //  document.getElementById("domainName").textContent = currentDomainName;

  let currentDom = domList[currentDomainName];
  console.log("current Dom: ", currentDom);
  //  document.getElementById("time").textContent = currentDom.totalTime;
  makeDomainCard(currentDom);
});

function makeDomainCard(currentDom) {
  const domainCard = document.createElement("div");
  domainCard.classList.add("domain-card");

  // create img tag for icon
  const icon = document.createElement("img");
  icon.src = currentDom.icon;
  icon.classList.add("icon-32");

  console.log("your icon element: ", icon);

  domainCard.appendChild(icon);
  const domainNameHeader = document.createElement("h3");
  domainNameHeader.textContent = currentDom.name;
  domainCard.appendChild(domainNameHeader);

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
