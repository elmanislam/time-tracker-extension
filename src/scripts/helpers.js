/*
 * ----------	---	---------------------------------------------------------
 * File: helpers.js
 * Project: time-tracker
 * File Created: Saturday, 30th May 2026 4:18:27 pm
 * Author: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Last Modified: Sunday, 31st May 2026 1:40:13 pm
 * Modified By: Elman Islam (elmanislam123@gmail.com)
 * -----
 * Copyright (c) 2026 Ilma Co.
 * ----------	---	---------------------------------------------------------
 */


export function formatTime(time) {
   let ms = time;
   let sec = Math.round(ms / 1000);
   let min = Math.floor(sec / 60);
   let hour = Math.floor(min / 60);
   if (!ms || ms <= 0) return "0 sec";
   if (min <= 0) return `${sec} sec`;
   if (hour <= 0) return `${min} min ${sec - min * 60} sec`;
   return `${hour} hr ${min - hour * 60} min`;
}
