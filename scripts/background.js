/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:59:03
 Last Modification Date: 2024-06-29 16:20:40

*********************************************/
import { createDomain, DEFAULT_ICON } from "./domain.mjs";

chrome.runtime.onInstalled.addListener(() => {
  console.log("you just installed time tracker");
});

chrome.tabs.onActivated.addListener(getCurrentTab);
chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.windows.onFocusChanged.addListener(getCurrentTab);

let currentDomain = "default";
let domainList = {};
let count = 0;
async function getCurrentTab(window) {
  // check if no window is open or focused
  if (window == chrome.windows.WINDOW_ID_NONE) {
    let dom = domainList[currentDomain];
    if (dom) dom.stopTimer();

    setDomainName();
    storeDomainList();
    // no tab is being focused

    return;
  }

  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  // there are no tabs
  if (!tab) return;

  let dom = domainList[currentDomain];
  if (dom) dom.stopTimer();

  currentDomain = getDomainName(tab.url);

  // page is loading or is invalid
  if (!currentDomain) return;

  dom = domainList[currentDomain];

  if (!dom) {
    const tempDomain = createDomain(currentDomain, count++, tab.favIconUrl);
    tempDomain.startTimer();
    domainList[currentDomain] = tempDomain;
  } else {
    // Update icon if it was not added properly
    if (dom.icon === DEFAULT_ICON && tab.favIconUrl && tab.favIconUrl !== "")
      dom.updateIcon(tab.favIconUrl);

    dom.startTimer();
    dom.printTime();
  }

  setDomainName();
  storeDomainList();
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

function setDomainName() {
  chrome.storage.local.set({ currentDomainName: currentDomain });
}

function storeDomainList() {
  chrome.storage.local.set({ domList: domainList });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.popup) {
    let dom = domainList[currentDomain];
    if (dom) {
      dom.stopTimer();
      setDomainName();
      storeDomainList();
    }
  }
  // Return true to indicate you want to send a response asynchronously
  sendResponse("good");
});
