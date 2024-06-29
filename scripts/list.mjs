/*

 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-26 11:06:20
 Last Modification Date: 2024-06-29 15:16:26

*/

/**
 * returns a domain object containing the domain name, icon, total time spent,
 *  and methods for recording time spent on the domain
 * @param domainName name of domain
 * @param domainId id for the domain
 * @returns domain object with timer methods and domain information
 */
export function createList() {
  // attributes

  let count = 0;
  let currentDomain = "default";
  let list = {};

  function addDomain(newDomain) {
   
   
  }
  function getDomain(domain) {}

  return {
    set currentDomain(newName) {
      currentDomain = newName;
    },
  };
}
