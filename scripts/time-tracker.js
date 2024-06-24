/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:58:34
 Last Modification Date: 2024-06-24 19:51:23

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
  let currDomName = await readLocalStorage("currentDomainName");

  currDom = domainList[currDomName];
  if (!currDom) return;
  makeDomainCard(currDom);
}

function makeDomainCard(currentDom) {
  const template = document.getElementById("domain-card-template");
  if (!template) return;
  const domainCard = template.content.cloneNode(true);
  console.log(currentDom.name);
  domainCard.querySelector(".domain-icon").src = currentDom.icon;
  if (currentDom.name === "google") {
    domainCard.querySelector(".domain-icon").src = "../img/logo-32.png";
  }

  domainCard.querySelector(".domain-name").textContent = currentDom.name;
  domainCard.querySelector(".domain-name").name = currentDom.name;
  domainCard.querySelector(".total-time").textContent =
    currentDom.formattedTime;
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

getData();
