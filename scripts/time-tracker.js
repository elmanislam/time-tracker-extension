/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-07-03 19:21:16

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
  console.log("sorted domainList: ", domainList);
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
  // TO DO: fix bug with google icon not showing
  if (dom.name === "google.com") {
    domainCard.querySelector(".domain-icon").src =
      "https://icons.duckduckgo.com/ip3/www.google.com.ico";
  }

  domainCard.querySelector(".domain-name").textContent = dom.name;
  domainCard.querySelector(".domain-name").name = dom.name;
  domainCard.querySelector(".total-time").textContent = formatTime(
    dom.totalTime
  );
  document.body.appendChild(domainCard);
}

function getSortedIndexes(list, type = "time") {
  type = type.toLowerCase().trim();
  return Object.keys(list).sort(function (a, b) {
    if (type === "alphabetical") return list[a].name - list[b].name;
    console.log(list[b], list[b].totalTime, list[a].totalTime);

    return list[b].totalTime - list[a].totalTime;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({ popup: true }, function (response) {
    getData();
  });
});

function formatTime(time) {
  let ms = time;
  let sec = Math.round(ms / 1000);
  let min = Math.floor(sec / 60);
  let hour = Math.floor(min / 60);
  if (!ms || ms <= 0) return "0 sec";
  if (min <= 0) return `${sec} sec`;
  if (hour <= 0) return `${min} min ${sec - min * 60} sec`;
  return `${hour} hr ${min - hour * 60} min`;
}
