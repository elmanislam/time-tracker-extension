/*
 * ----------	---	---------------------------------------------------------
 * File: DomainCardContainer.jsx
 * Project: time-tracker
 * File Created: Saturday, 30th May 2026 4:02:08 pm
 * Author: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Last Modified: Sunday, 31st May 2026 1:40:13 pm
 * Modified By: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Copyright (c) 2026 Ilma Co.
 * ----------	---	---------------------------------------------------------
 */

import DomainCard from "./DomainCard.jsx";

function getSortedIndexes(list, type = "time") {
   type = type.toLowerCase().trim();
   return Object.keys(list).sort(function (a, b) {
      if (type === "alphabetical") return list[a].name - list[b].name;
      return list[b].totalTime - list[a].totalTime;
   });
}

export default function DomainCardContainer({ userDomainList }) {

   const sortedList = getSortedIndexes(userDomainList);
   let domainCards = []
   let i = 0;
   sortedList.forEach((domainName) => {
      if (i >= 5) return;
      domainCards.push(<DomainCard domain={userDomainList[domainName]} />);
      i++;
   });

   return (
      <div class="domain-card-container box-color">
         {domainCards}
      </div>
   );
}