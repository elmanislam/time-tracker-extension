/*

 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-06-26 13:55:58
 Last Modification Date: 2024-07-30 20:01:00

*/
const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        resolve();
      } else {
        resolve(result[key]);
      }
    });
  });
};

function formatTime(time) {
  let ms = time;
  let sec = Math.round(ms / 1000);
  let min = Math.floor(sec / 60);
  let hour = Math.floor(min / 60);
  if (!ms || ms <= 0) return "0 sec";
  if (min <= 0) return `${sec} sec`;
  if (hour <= 0) return `${min} min ${sec - min * 60} sec`;
  return `${hour} hr ${min - hour * 60} min`;
}

function toggleDarkMode() {
  const root = document.documentElement;
  const newTheme = root.getAttribute("theme") === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function setTheme(newTheme) {
  const rootColors = document.querySelector(":root");

  const setColors = (vars) =>
    Object.entries(vars).forEach((v) =>
      rootColors.style.setProperty(v[0], v[1])
    );

  const darkColors = {
    "--color-primary": "#171717",
    "--color-secondary": ":#000000",
    "--color-font": "#ffffff",
  };

  const lightColors = {
    "--color-primary": "#f4f4f4",
    "--color-secondary": "#ffffff",
    "--color-font": "#000000",
  };

  const colorScheme = newTheme === "dark" ? darkColors : lightColors;
  setColors(colorScheme);

  const root = document.documentElement;
  root.setAttribute("theme", newTheme);
  chrome.storage.local.set({ theme: newTheme });
}

(async function () {
  const currentTheme = await readLocalStorage("theme");
  setTheme(currentTheme);

  document
    .getElementById("dark-mode")
    .addEventListener("click", toggleDarkMode);
})();
