import { createDomain } from "./scripts/domain.mjs";

chrome.tabs.onActivated.addListener(getCurrentTab);
chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.windows.onFocusChanged.addListener(getCurrentTab);

let currentDomain = "default";
async function getCurrentTab(window) {
  // check if no window is open or focused
  if (window == chrome.windows.WINDOW_ID_NONE) {
    currentDomain = null;
    setDomainName();

    console.log("no tab is being focused");
    return;
  }

  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (tab) {
    console.log("your tab is ", tab);
    currentDomain = getDomainName(tab);
    setDomainName();
  }
}
function getDomainName(tab) {
  return tab.url.replace(/.+\/\/|www.|\..+/g, "");
}

function setDomainName() {
  chrome.storage.local.set({ currentDomainName: currentDomain });
}

let myDomain = createDomain("fakeSite", 1);

myDomain.startTimer();

const timer = setTimeout(myDomain.stopTimer, 3000);
