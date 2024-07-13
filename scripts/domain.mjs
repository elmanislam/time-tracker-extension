/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:57:28
 Last Modification Date: 2024-07-12 20:46:35

*********************************************/

// default icon used if a domain has no icon
export const DEFAULT_ICON = "../img/no-icon-32.png";

/**
 * create a domain object containing the domain name, icon, total time spent,
 *  and methods for recording time spent on the domain
 * @param domainName name of domain
 * @param domainId id for the domain
 * @param favIconUrl url for icon for the domain
 * @returns domain object with timer methods and domain data
 */
export function createDomain(domainName, domainId, favIconUrl, time = 0) {
  const name = domainName;
  const id = domainId;
  let icon = favIconUrl || DEFAULT_ICON;
  let totalTime = time; // total time spent on the domain in seconds
  let startTime = null; // to keep track of the start time, null when timer is off or paused

  function startTimer() {
    if (!startTime) startTime = new Date().getTime();
    else {
      console.log("ERROR: attempted to start a currently running timer");
    }
  }

  function stopTimer() {
    if (!startTime) {
      console.log("ERROR: attempted to stop an offline timer");
      return;
    }

    totalTime += new Date().getTime() - startTime; // calculate elapsed paused time
    startTime = null;
  }

  function updateIcon(favIconUrl) {
    icon = favIconUrl;
  }

  return {
    startTimer,
    stopTimer,
    updateIcon,
    get totalTime() {
      return totalTime;
    },
    get name() {
      return name;
    },
    get id() {
      return id;
    },
    get icon() {
      return icon;
    },
  };
}
