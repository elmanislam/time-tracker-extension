let domList;
let currentDomainName;
chrome.storage.local.get(["domList"]).then((result) => {
  console.log("result = ", result.domList);
  domList = result.domList;
});

chrome.storage.local.get(["currentDomainName"]).then((result) => {
  currentDomainName = result.currentDomainName;
  document.getElementById("domainName").textContent = currentDomainName;

  let currentDom = domList[currentDomainName];

  document.getElementById("time").textContent = currentDom.totalTime;
});
