export function createDomain(domainName, domainId) {
  // attributes
  const name = domainName;
  const id = domainId;

  let totalTime = 0; // total time spent on the domain in seconds
  let startTime = 0; // to keep track of the start time
  let stopwatchInterval; // to keep track of the interval

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
  }

  function updateTimer() {
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
  }

  return {
    startTimer,
    stopTimer,
    updateTimer,
    get totalTime() {
      return totalTime;
    },
    get name() {
      return name;
    },
    get id() {
      return id;
    },
  };
}
