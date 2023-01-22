var pending_str = document.getElementById('pendingcase').value;
var pending = parseInt(pending_str);
var solved = 100 - pending;

let optionsVisitorsProfile = {
  series: [solved, pending],
  labels: ["Solved", "Pending"],
  colors: ["#435ebe", "#55c6e8"],
  chart: {
    type: "donut",
    width: "100%",
    height: "350px",
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "30%",
      },
    },
  },
}

var chartVisitorsProfile = new ApexCharts(
  document.getElementById("chart-visitors-profile"),
  optionsVisitorsProfile
)

chartVisitorsProfile.render()
