/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:59:03
 Last Modification Date: 2024-07-28 16:41:01

*********************************************/
import { createDomainList } from "./domain-list.mjs";

let myDomains;
let currentDomainName = null;

const readLocalStorage = async (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        resolve({});
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
  // load stored data from previous browsing sessions into 'myDomains' list structure

  let tempList = await readLocalStorage("domList");

  console.log("loaded: ", tempList);

  myDomains = createDomainList(tempList);
  console.log("running test: ");
  myDomains.test();

  myDomains.storeList();

  chrome.runtime.onMessage // event listener for time-tracker.js
    .addListener((request, sender, sendResponse) => {
      let userConfigData = {
        theme: "light",
      };
      // stop timer and store domain when time-tracker popup opens
      if (request.isPopup) {
        myDomains.stopTimer(currentDomainName);
        myDomains.storeList();
      }

      if (request.requestUserConfig) {
        userConfigData = {};
      }
      // Return true to indicate you want to send a response asynchronously
      sendResponse(userConfigData);
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
