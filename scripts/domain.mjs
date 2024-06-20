export function createDomain(name, id) {
  // attributes
  const domainName = name;
  const domainId = id;

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
    clearInterval(stopwatchInterval); // stop the interval
    totalTime += new Date().getTime() - startTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
    console.log("you spent ", totalTime, "ms on this site");
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
  };
}
