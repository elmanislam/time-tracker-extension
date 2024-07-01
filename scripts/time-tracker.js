/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-06-30 13:12:45

View Extension index page here --> chrome-extension://gffnjaobgldhllbkpkijfdnmllmklcib/index.html
*********************************************/
const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};

async function getData() {
  let domainList = await readLocalStorage("domList");
  console.log("domainList: ", domainList);
  if (!domainList) return;

  const sortedList = getSortedIndexes(domainList);

  let i = 0;
  sortedList.forEach((domainName) => {
    if (i >= 5) return;
    makeDomainCard(domainList[domainName]);
    i++;
  });
}

function makeDomainCard(dom) {
  const template = document.getElementById("domain-card-template");
  if (!dom || !template) return;
  const domainCard = template.content.cloneNode(true);
  domainCard.querySelector(".domain-icon").src = dom.icon;
  if (dom.name === "google.com") {
    domainCard.querySelector(".domain-icon").src = "../img/logo-32.png";
  }

  domainCard.querySelector(".domain-name").textContent = dom.name;
  domainCard.querySelector(".domain-name").name = dom.name;
  domainCard.querySelector(".total-time").textContent = dom.formattedTime;
  document.body.appendChild(domainCard);
}

function getSortedIndexes(list, type = "time") {
  type = type.toLowerCase().trim();

  return Object.keys(list).sort(function (a, b) {
    if (type === "alphabetical") return list[a].name - list[b].name;
    return list[b].totalTime - list[a].totalTime;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({ popup: true }, function (response) {
    getData();
  });
});
