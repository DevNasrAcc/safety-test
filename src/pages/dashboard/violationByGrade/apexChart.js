import React from "react";
import { useSelector } from "react-redux";

import Chart from "react-apexcharts";

const ApexChart = (props) => {
  const { data, inn, categories } = props;
  const panel = useSelector((state) => state.leftState.leftState);

  const colors = ["#9BA5CC", "#88CDD4", "#188E9C"];
  const series = [
    {
      name: "Inflation",
      data: data,
    },
  ];

  const options = {
    chart: {
      height: 270,
      type: "bar",

      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 8.29,
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return data;
      },
      offsetY: -20,
      style: {
        fontSize: "10px",
        colors: ["#304758"],
        fontFamily: "MontserratMedium",
      },
    },

    colors: colors,

    grid: {
      show: false,
    },

    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12.33px",
          fontFamily: "MontserratRegular",
          colors: ["#98A1B0"],
        },
      },
    },

    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },

    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

        return `<div class="apexchart_box"><h2>${data}</h2></div>`;
      },
    },
    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 180,
          },

          dataLabels: {
            style: {
              fontSize: "6px",
            },
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: 150,
          },

          plotOptions: {
            bar: {
              borderRadius: 4,
            },
          },

          dataLabels: {
            offsetY: -16,
            style: {
              fontSize: "7px",
            },
          },

          xaxis: {
            labels: {
              style: {
                fontSize: "8px",
              },
            },
          },
        },
      },
      {
        breakpoint: 1530,
        options: {
          chart: {
            height: 200,
          },

          dataLabels: {
            style: {
              fontSize: "8px",
            },
          },

          plotOptions: {
            bar: {
              borderRadius: 6,
            },
          },
        },
      },
      {
        breakpoint: 1730,
        options: {
          chart: {
            height: 220,
          },
        },
      },
      {
        breakpoint: 1830,
        options: {
          chart: {
            height: 231,
          },
        },
      },
    ],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="270px"
      id={`${inn ? "chartInModal" : panel ? "pnChart" : "fushionChart"}`}
    />
  );
};

export default ApexChart;
