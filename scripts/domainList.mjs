/*

 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-26 11:06:20
 Last Modification Date: 2024-07-02 18:36:39

*/

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
  let list = {};
  for (const [name, dom] of Object.entries(listStructure)) {
    list[name] = createDomain(dom.name, dom.id, dom.icon, dom.time);
  }

  function add(newDomain) {
    return (list[newDomain.name] = newDomain);
  }
  function get(name) {
    return list[name];
  }

  function stopTimer(name) {
    let dom = list[name];
    if (!dom) return false;
    try {
      dom.stopTimer();
      return true;
    } catch (e) {
      console.error(`Error: Failed to stop time for domain ${dom}\n`, e);
      return false;
    }
  }

  function setCurrDom(newCurr) {
    currentDomain = newCurr;
    return true;
  }

  function storeList() {
    chrome.storage.local.set({ domList: domainList });
  }

  function toJSON() {
    let data = {};
    for (const [name, dom] of Object.entries(list)) {
      data[name] = [dom.name, dom.id, dom.icon, dom.totalTime];
    }

    return data;
  }
  return {
    setCurrDom,
    add,
    get,
    toJSON,
    storeList,
    list,
    get curr() {
      return currDomName;
    },
  };
}
