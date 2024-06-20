chrome.storage.local.get(["currentDomainName"]).then((result) => {
  document.getElementById("domainName").textContent = result.currentDomainName;
});
