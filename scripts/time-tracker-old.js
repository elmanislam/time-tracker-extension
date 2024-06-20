/*chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      apiSuggestions: ["tabs", "activeTab", "scripting"],
    });
  }
}); */

// All events that change focus of the current tab

firstTimeOpening = true;

chrome.tabs.onActivated.addListener(getCurrentTab);
chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.windows.onFocusChanged.addListener(getCurrentTab);
window.addEventListener("click", getCurrentTab);

class Domain {
  constructor(url, favIconUrl) {
    this.url = url;
    this.favIconUrl = favIconUrl;
    this.time = 0;
  }
  get getTime() {
    return this.time;
  }
  set setTime(ms) {
    this.time += ms;
  }
}

let domains = [];
domains.push(new Domain("default", null));
let currentDomain = "default";
async function getCurrentTab(window) {
  d = null;
  if (window == chrome.windows.WINDOW_ID_NONE) {
    currentDomain = null;
    showDomain(null);
    return;
  }

  let queryOptions = { active: true, lastFocusedWindow: true };

  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  if (tab) {
    if (firstTimeOpening) {
      firstTimeOpening = false;
    } else {
      stopStopwatch();
      d = domains.find((dom) => dom.url == currentDomain);
      if (d) d.setTime = elapsedPausedTime;
    }
    startStopwatch();

    currentDomain = getDomainName(tab.url);
    d = domains.find((dom) => dom.url == currentDomain);

    if (!d) {
      d = new Domain(currentDomain, tab.favIconUrl);
      console.log("new class ", d);
      domains.push(d);
    }
  } else {
    stopStopwatch();
    d = domains.find((dom) => dom.url == currentDomain);
    if (d) d.setTime = elapsedPausedTime;
    currentDomain = "default";
  }

  console.log(domains);
  showDomain(d);
}

function getDomainName(url) {
  let a = document.createElement("a");
  a.href = url;
  return a.hostname;
}

function showDomain(d) {
  let header = document.querySelector("h1");
  icon = document.querySelector("img");
  let time = document.querySelector("p");

  if (!d) {
    header.innerText = "No tab is currently open";
  } else {
    header.innerText = d.url;
    time.innerText = Math.floor(d.getTime / 1000);
    if (d.favIconUrl) icon.setAttribute("src", d.favIconUrl);
  }
}

let startTime = 0; // to keep track of the start time
let stopwatchInterval = 0; // to keep track of the interval
let elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime();
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval); // stop the interval
  elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
  stopwatchInterval = null; // reset the interval variable
}

function updateStopwatch() {
  var currentTime = new Date().getTime(); // get current time in milliseconds
  var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
}
