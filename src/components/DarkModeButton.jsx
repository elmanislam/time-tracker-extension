/*
 * ----------	---	---------------------------------------------------------
 * File: DarkModeButton.jsx
 * Project: time-tracker
 * File Created: Saturday, 30th May 2026 4:02:14 pm
 * Author: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Last Modified: Sunday, 31st May 2026 2:08:38 pm
 * Modified By: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Copyright (c) 2026 Ilma Co.
 * ----------	---	---------------------------------------------------------
 */
import { themelbs } from "../labels/labels.js";

function setTheme(newTheme) {
   const rootColors = document.querySelector(":root");

   const setColors = (vars) =>
      Object.entries(vars).forEach((v) =>
         rootColors.style.setProperty(v[0], v[1])
      );

   const darkColors = {
      "--color-primary": "#171717",
      "--color-secondary": "#000000",
      "--color-font": "#ffffff",
   };

   const lightColors = {
      "--color-primary": "#ffffff",
      "--color-secondary": "#ffffff",
      "--color-font": "#000000",
   };

   const colorScheme = newTheme === themelbs.dark ? darkColors : lightColors;
   setColors(colorScheme);

   const root = document.documentElement;
   root.setAttribute(themelbs.theme, newTheme);
   console.log("root, ", root);
   window.chrome.storage.local.set({ [themelbs.theme]: newTheme });
}

function toggleDarkMode() {
   const root = document.documentElement;
   const newTheme = root.getAttribute(themelbs.theme) === themelbs.dark ? themelbs.light : themelbs.dark;
   setTheme(newTheme);
   console.log("new theme is ", newTheme);
}

function DarkModeButton() {

   return (
      <button
         id="dark-mode-button"
         type="button"
         onClick={toggleDarkMode}
         className="toggle-button icon-32 justify-end"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-moon-stars-fill icon-16"
            viewBox="0 0 16 16"
         >
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
         </svg>
      </button>
   );
}

export { setTheme };
export default DarkModeButton;
