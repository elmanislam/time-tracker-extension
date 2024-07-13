/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:59:03
 Last Modification Date: 2024-07-12 20:32:23

*********************************************/
import { createDomainList } from "./domainList.mjs";

let myDomains;
let currentDomainName = null;

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

(async function () {
  // onboarding for extension download
  chrome.runtime.onInstalled.addListener(() => {
    console.log("you just installed time tracker");
  });

  let tempList = await readLocalStorage("domList"); // load stored data into myDomains structure if previous data exists

  console.log("loaded: ", tempList);

  myDomains = createDomainList(tempList);
  console.log("running test: ");
  myDomains.test();

  myDomains.storeList();

  chrome.runtime.onMessage // event listener for time-tracker.js
    .addListener((request, sender, sendResponse) => {
      // stop timer and store domain when time-tracker popup opens
      if (request.popup) {
        myDomains.stopTimer(currentDomainName);
        myDomains.storeList();
      }
      // Return true to indicate you want to send a response asynchronously
      sendResponse("good");
    });

  // event listeners for tab and window changes
  chrome.tabs.onActivated.addListener(getCurrentTab);
  chrome.tabs.onUpdated.addListener(getCurrentTab);
  chrome.windows.onFocusChanged.addListener(getCurrentTab);
})();

async function getCurrentTab(window) {
  // check if no window is open or focused
  if (window == chrome.windows.WINDOW_ID_NONE) {
    myDomains.stopTimer(currentDomainName);
    myDomains.storeList();

    // no tab is being focused
    return;
  }

  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  // there are no tabs
  if (!tab) return;

  myDomains.stopTimer(currentDomainName);

  currentDomainName = getDomainName(tab.url);
  myDomains.setCurrDom(currentDomainName);
  // page is loading or is invalid
  if (!currentDomainName) return;

  myDomains.addOrStartTimer(currentDomainName, tab.favIconUrl);

  myDomains.storeList(currentDomainName);
  // myDomains.test();
}
function getDomainName(url) {
  if (!url || url === "") return null;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (e) {
    console.error(`Invalid URL: ${url}`, e);
    return null;
  }
  // return tab.url.replace(/.+\/\/|www.|\..+/g, "").trim();
}
