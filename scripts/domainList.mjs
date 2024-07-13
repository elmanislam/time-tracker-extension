/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-26 11:06:20
 Last Modification Date: 2024-07-12 20:55:43

*********************************************/

import { createDomain, DEFAULT_ICON } from "./domain.mjs";

/**
 * create a list of domains visited. Each item in the list is a 'domain' object.
 * Can also load previously visited domains from a past browsing session.
 * @param listStructure list of data outlining domains visited in a previous browsing session
 * @returns domain list object with methods for adding to the list, storing data, and accessing
 * 'domain' methods
 */
export function createDomainList(listStructure = {}) {
  let count = 0; // generates id for each domain
  let currDomName = "default";
  let list = {}; // list of domains

  // load optional stored data into list
  for (const [name, dom] of Object.entries(listStructure)) {
    list[name] = createDomain(dom.name, count++, dom.icon, dom.totalTime);
  }

  /**
   * start a timer for domName and create it as a new 'domain' object if first time visiting
   * @param domName name of domain to access
   * @param newDomIcon domain icon
   */
  function addOrStartTimer(domName, newDomIcon) {
    let dom = list[domName];

    if (!dom) {
      // add a newly visited domain
      const tempDomain = createDomain(domName, count++, newDomIcon);
      tempDomain.startTimer();
      list[domName] = tempDomain;
    } else {
      // update icon if it was not added properly
      if (dom.icon === DEFAULT_ICON && newDomIcon && newDomIcon !== "")
        dom.updateIcon(newDomIcon);

      dom.startTimer();
    }
  }

  function test() {
    console.log(toJSON());
  }

  function stopTimer(domName) {
    let dom = list[domName];
    if (!dom) return false;
    try {
      dom.stopTimer();
      return true;
    } catch (e) {
      console.error(`Error: Failed to stop time for domain ${dom}\n`, e);
      return false;
    }
  }

  function setCurrDom(newCurr = null) {
    currDomName = newCurr;
    return true;
  }

 /** store domain 'list' object as JSON, in chrome storage
   * @param domName domain name to set after storing data (null if no page is active)
   */
  function storeList(domName = null) {
    const domainListData = toJSON();
    chrome.storage.local.set({ domList: domainListData });
    return setCurrDom(domName);
  }

  /** convert 'list' to JSON
   * @return 'data' object list containing each domain's name, id, icon, and total time
   */
  function toJSON() {
    let data = {};
    for (const [name, dom] of Object.entries(list)) {
      data[name] = {
        name: name,
        id: dom.id,
        icon: dom.icon,
        totalTime: dom.totalTime,
      };
    }

    return data;
  }

  return {
    addOrStartTimer,
    storeList,
    test,
    setCurrDom,
    stopTimer,
  };
}
