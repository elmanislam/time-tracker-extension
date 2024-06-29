/*********************************************
 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-22 10:57:28
 Last Modification Date: 2024-06-29 16:09:32

*********************************************/

export const DEFAULT_ICON = "../img/no-icon-32.png";

/**
 * returns a domain object containing the domain name, icon, total time spent,
 *  and methods for recording time spent on the domain
 * @param domainName name of domain
 * @param domainId id for the domain
 * @returns domain object with timer methods and domain information
 */
export function createDomain(domainName, domainId, favIconUrl) {
  // attributes

  const name = domainName;
  const id = domainId;
  let icon = favIconUrl || DEFAULT_ICON;
  let totalTime = 0; // total time spent on the domain in seconds
  let startTime = 0; // to keep track of the start time
  let stopwatchInterval; // to keep track of the interval
  let formattedTime = "0 sec";
  function startTimer() {
    if (!stopwatchInterval) {
      startTime = new Date().getTime();
      stopwatchInterval = setInterval(updateTimer, 1000); // update every second
    }
  }

  function stopTimer() {
    if (!stopwatchInterval) return;

    clearInterval(stopwatchInterval); // stop the interval

    totalTime += new Date().getTime() - startTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
    formattedTime = formatTime();
  }

  function updateTimer() {
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
  }

  function formatTime() {
    let ms = totalTime;
    let sec = Math.round(ms / 1000);
    let min = Math.floor(sec / 60);
    let hour = Math.floor(min / 60);
    if (min <= 0) return `${sec} sec`;
    if (hour <= 0) return `${min} min ${sec - min * 60} sec`;
    return `${hour} hr ${min - hour * 60} min`;
  }
  function updateIcon(favIconUrl) {
    icon = favIconUrl;
  }

  return {
    startTimer,
    stopTimer,
    updateTimer,
    updateIcon,
    get totalTime() {
      return totalTime;
    },
    get formattedTime() {
      return formattedTime;
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
