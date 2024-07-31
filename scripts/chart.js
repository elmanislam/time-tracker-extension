/*

 Author: Elman I.
 Email: elmanislam123@gmail.com

 Creation Date: 2024-07-30 20:15:01
 Last Modification Date: 2024-07-30 20:25:24

 

*/

const data = {
  datasets: [
    {
      data: [20, 30, 15, 10, 25],
      backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4CAF50", "#9C27B0"],
    },
  ],
};
const options = {
  plugins: {
    legend: true,
    tooltip: {
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index] || "";
          const value = data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}%`;
        },
      },
    },
    textInside: {
      text: "GeeksforGeeks",
      color: "green",
      fontSize: 12,
    },
  },
};
Chart.register({
  id: "textInside",
  afterDatasetsDraw: function (chart, _) {
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    const fontSize = options.plugins.textInside.fontSize;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = options.plugins.textInside.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const text = options.plugins.textInside.text;
    const textX = Math.round(width / 2);
    const textY = Math.round(height / 2);
    ctx.fillText(text, textX, textY);
  },
});
/*
const textChart = new Chart(document.getElementById("chart1"), {
  type: "doughnut",
  data: data,
  options: options,
  responsive: true,
});*/
