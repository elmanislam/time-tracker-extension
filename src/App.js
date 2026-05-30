/*

 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2025-07-19 16:07:09
 Last Modification Date: 2025-07-20 21:53:25

 

*/

import { useEffect, useState } from "react";
import "./App.css";
import "./styles/styles.css";
import DarkModeButton from "./components/DarkModeButton";
import DomainCardContainer from "./components/DomainCardContainer";
const DOMLIST = "domList";
function App() {

   const [userDomainList, setUserDomainList] = useState(null);

   /* Send a message to background script to get user config and domain list when popup loads */
   useEffect(() => {

      window.chrome.runtime.sendMessage(
         { isPopup: true, requestUserConfig: true },
         function (response) {
            window.chrome.storage.local.get(
               [DOMLIST],
               (result) => {
                  setUserDomainList(result[DOMLIST] || null);
               }
            );
         }
      );

   }, []);

   return (
      <div class="body-color">
         <header>
            <img src="img/logo-32.png" />
            <h1>
               <strong>Time</strong> Tracker
            </h1>
            <div class="button-panel">
               <button id="delete-button" class="toggle-button icon-32 justify-end">
                  <img src="img/trash.png" class="icon-16" />
               </button>
               <DarkModeButton />
            </div>
         </header>
         <div class="card box-color">
            <h2>Your Top Sites</h2>
            <h3>bruh!</h3>
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
