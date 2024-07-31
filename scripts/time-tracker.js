/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-07-30 20:25:52

View Extension index page here --> chrome-extension://gffnjaobgldhllbkpkijfdnmllmklcib/index.html
*********************************************/

(async function () {
  document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.sendMessage(
      { isPopup: true, requestUserConfig: true },
      function (response) {
        getData();
      }
    );
  });
})();

async function getData() {
  let domainList = await readLocalStorage("domList");

  if (!domainList) return;

  const sortedList = getSortedIndexes(domainList);
  let i = 0;
  sortedList.forEach((domainName) => {
    if (i >= 5) return;
    makeDomainCard(domainList[domainName]);
    i++;
  });
}

function makeGraph() {}
function makeDomainCard(dom) {
  const template = document.getElementById("domain-card-template");
  if (!dom || !template) return;
  const domainCard = template.content.cloneNode(true);
  domainCard.querySelector(".domain-icon").src = dom.icon;
  // TO DO: fix bug with google icon not showing
  if (dom.name === "www.google.com") {
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
    return list[b].totalTime - list[a].totalTime;
  });
}
