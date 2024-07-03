/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-26 11:06:20
 Last Modification Date: 2024-07-03 19:46:00

*********************************************/

import { createDomain, DEFAULT_ICON } from "./domain.mjs";

/**
 * returns a domain object containing the domain name, icon, total time spent,
 *  and methods for recording time spent on the domain
 * @param domainName name of domain
 * @param domainId id for the domain
 * @returns domain object with timer methods and domain information
 */
export function createDomainList(listStructure = {}) {
  // attributes

  let count = 0;
  let currDomName = "default";
  let list = {}; // list of domains

  // load optional stored data into list
  for (const [name, dom] of Object.entries(listStructure)) {
    list[name] = createDomain(dom.name, count++, dom.icon, dom.totalTime);
  }

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

  function storeList(domName = null) {
    const domainListData = toJSON();
    chrome.storage.local.set({ domList: domainListData });
    return setCurrDom(domName);
  }

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
