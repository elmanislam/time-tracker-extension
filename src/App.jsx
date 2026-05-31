/*
 * ----------	---	---------------------------------------------------------
 * File: App.jsx
 * Project: time-tracker
 * File Created: Saturday, 30th May 2026 4:02:14 pm
 * Author: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Last Modified: Sunday, 31st May 2026 3:44:48 pm
 * Modified By: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Copyright (c) 2026 Ilma Co.
 * ----------	---	---------------------------------------------------------
 */


import React, { useEffect, useState } from 'react';
import './App.css'
import DarkModeButton from "./components/DarkModeButton.jsx";
import { setTheme } from "./components/DarkModeButton.jsx";
import DomainCardContainer from "./components/DomainCardContainer.jsx";
import { DOMLIST, themelbs } from "./labels/labels.js";
import "./styles/styles.css"
function App() {

   const [userDomainList, setUserDomainList] = useState(null);

   /* Send a message to background script to get user config and domain list when popup loads */
   useEffect(() => {

      window.chrome.runtime.sendMessage(
         { isPopup: true, requestUserConfig: true },
         function (response) {
            window.chrome.storage.local.get(
               [DOMLIST, themelbs.theme],
               (result) => {
                  setUserDomainList(result[DOMLIST] || null);
                  setTheme(result[themelbs.theme] || themelbs.light);
                  console.log("user config is ", result);
               }
            );
         }
      );

   }, []);

   return (
      <div class="body-color">

         <header>
            <img src="img/logo-32.png" />
            <h1 class="text-2xl">
               <b>Time</b> Tracker
            </h1>
            <div class="button-panel">
               <button id="delete-button" class="toggle-button icon-32 justify-end">
                  <img src="img/trash.png" class="icon-16" />
               </button>
               <DarkModeButton />
            </div>
         </header>
         <div class="card box-color">
            <h2 class="text-xl">Your Top Sites</h2>
         </div>
         {userDomainList && (
            <DomainCardContainer userDomainList={userDomainList} />
         )}

         <template id="domain-card-template">
            <div class="domain-card box-color">
               <img class="domain-icon icon-32" />
               <div class="info">
                  <h3 class="domain-name">Domain Name</h3>
                  <p class="total-time">Total Time</p>
               </div>
            </div>
         </template>


      </div>
   );
}

export default App;
