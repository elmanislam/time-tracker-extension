/*
 * ----------	---	---------------------------------------------------------
 * File: DomainCard.jsx
 * Project: time-tracker
 * File Created: Saturday, 30th May 2026 4:02:14 pm
 * Author: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Last Modified: Sunday, 31st May 2026 1:40:13 pm
 * Modified By: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Copyright (c) 2026 Ilma Co.
 * ----------	---	---------------------------------------------------------
 */

import { formatTime } from "../scripts/helpers.js";

export default function DomainCard({ domain }) {

   return (
      <div class="domain-card box-color">
         <img class="domain-icon icon-32" src={domain.icon} />
         <div class="info">
            <h3 class="domain-name">{domain.name}</h3>
            <p class="total-time">{formatTime(domain.totalTime)}</p>
         </div>
      </div>
   );
}