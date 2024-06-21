import { createDomain } from "./scripts/domain.mjs";

chrome.tabs.onActivated.addListener(getCurrentTab);
chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.windows.onFocusChanged.addListener(getCurrentTab);

let currentDomain = "default";
let domainList = [];
let count = 0;
async function getCurrentTab(window) {
  // check if no window is open or focused
  if (window == chrome.windows.WINDOW_ID_NONE) {
    let dom = domainList.find((dom) => dom.name === currentDomain);
    if (dom) dom.stopTimer();
    currentDomain = "default";
    setDomainName();

    console.log("no tab is being focused");
    return;
  }

  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (tab) {
    let dom = domainList.find((dom) => dom.name === currentDomain);
    if (dom) {
      console.log(
        `You spent ${Math.round(dom.totalTime / 1000)} sec on ${dom.name}`
      );
      dom.stopTimer();
    }
    currentDomain = getDomainName(tab);

    dom = domainList.find((dom) => dom.name === currentDomain);
    if (!dom) {
      const tempDomain = createDomain(currentDomain, count++);
      tempDomain.startTimer();
      domainList.push(tempDomain);
      console.log("A new domain called ", tempDomain.name, " has been added");
    } else {
      dom.startTimer();
      console.log("Your domain is now ", dom.name);
    }
    storeDomainList();
    setDomainName();
  }
}
function getDomainName(tab) {
  return tab.url.replace(/.+\/\/|www.|\..+/g, "");
}

function setDomainName() {
  chrome.storage.local.set({ currentDomainName: currentDomain });
}

function storeDomainList() {
  chrome.storage.local.set({ domList: domainList });
}
