/*

 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-26 11:06:20
 Last Modification Date: 2024-07-02 19:05:42

*/

/**
 * returns a domain object containing the domain name, icon, total time spent,
 *  and methods for recording time spent on the domain
 * @param domainName name of domain
 * @param domainId id for the domain
 * @returns domain object with timer methods and domain information
 */
let DomainList = function (name, listStructure = {}) {
  // attributes
  this.name = name;
  this.count = 0;
  this.currDomName = "default";
  this.list = {};
  for (const [name, dom] of Object.entries(listStructure)) {
    this.list[name] = createDomain(dom.name, dom.id, dom.icon, dom.time);
  }
};

DomainList.prototype.add = function (newDom, domName) {
  this.list[domName] = newDom;
};

DomainList.prototype.stopTimer = function (name) {
  let dom = this.list[name];
  if (!dom) return false;
  try {
    dom.stopTimer();
    return true;
  } catch (e) {
    console.error(`Error: Failed to stop time for domain ${dom}\n`, e);
    return false;
  }
};

DomainList.prototype.setCurrDom = function (newCurr) {
  this.currDomName = newCurr;
  return true;
};

DomainList.prototype.storeList = function () {
  chrome.storage.local.set({ domList: DomainList });
};

DomainList.prototype.toJSON = function () {
  let data = {};
  try {
    for (const [name, dom] of Object.entries(this.list)) {
      data[name] = [dom.name, dom.id, dom.icon, dom.totalTime];
    }
    return data;
  } catch (e) {
    console.error(
      `Error: Failed to convert domain list '${this.name}' to JSON\n`,
      e
    );
    return null;
  }
};

export default DomainList;
