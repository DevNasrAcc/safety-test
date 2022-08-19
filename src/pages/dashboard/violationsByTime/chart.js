/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import moment from "moment";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Charts = (props) => {
  const { valueType, inn, toggleByDay } = props;
  const byDay = useSelector((state) => state.byDay.byDay);
  const [width, setWidth] = React.useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const [userData, setUserData] = useState({
    labels: byDay.map((value) => {
      const formatDate = moment(value?.date).format("MMM DD");
      return formatDate;
    }),
    datasets: [
      {
        label: "",
        data: byDay.map((value) => value.violationCount),
        borderColor: "rgba(0, 207, 253, 1)",
        tension: 0.4,
        pointBorderColor: "#FFFFFF",
        pointBackgroundColor: "#3246D2",
        pointHoverRadius: 3.6173,
        pointHitRadius: 4,
      },
    ],
  });

  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);

  useEffect(() => {
    let maxTotal = 0;
    if (width <= 600) {
      maxTotal = 4;
      setMaxVal(maxTotal);
    } else {
      maxTotal = 8;
      setMaxVal(maxTotal);
    }
  }, [width]);

  const tooltipItem = (items) => {
    let value = "";
    if (toggleByDay) {
      let sum = 0;
      for (let i = 0; i < items[0]?.dataset?.data?.length; i++) {
        sum += items[0]?.dataset?.data[i];
      }
      const perc = (items[0]?.raw / sum) * 100;

      value = `${perc.toFixed(2)} ${valueType}`;
    } else {
      value = `${items[0]?.raw} ${valueType}`;
    }

    return value;
  };

  const labelToolTip = (items) => {
    return "";
  };

  const beforeToolTip = (items) => {
    return "";
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#98A1B0",
          font: {
            size:
              inn && width >= 600
                ? 18
                : width <= 600
                ? 8
                : width <= 1200
                ? 12
                : 10,
            family: "MontserratRegular",
          },
        },
      },
      x: {
        beginAtZero: true,
        min: minVal,
        max: maxVal,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#98A1B0",
          font: {
            size:
              inn && width >= 600
                ? 18
                : width <= 600
                ? 8
                : width <= 1200
                ? 12
                : 10,
            family: "MontserratRegular",
          },
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        interaction: {
          axis: "xy",
          mode: "nearest",
          intersect: false,
        },
        backgroundColor: "rgba(97, 97, 97, 0.92)",
        displayColors: false,
        callbacks: {
          title: tooltipItem,
          label: labelToolTip,
          beforeTitle: beforeToolTip,
        },
        titleFont: {
          size: 10,
          family: "Montserrat",
          weight: 500,
        },
        titleMarginBottom: 0,
        caretSize: 0,
        padding: 8,
      },
    },
  };

  const scroller = (scroll) => {
    const dataLabel = userData.labels.length;
    if (scroll.nativeEvent.deltaY < 0 || scroll.nativeEvent.deltaX > 0) {
      if (options.scales.x.max >= dataLabel) {
        if (width <= 600) {
          let forMin = dataLabel - 4;
          setMinVal(forMin);
        } else {
          let forMin = dataLabel - 8;
          setMinVal(forMin);
        }
        const forMax = dataLabel;
        setMaxVal(forMax);
      } else {
        setMinVal(minVal + 1);
        setMaxVal(maxVal + 1);
      }
    } else if (scroll.nativeEvent.deltaY > 0 || scroll.nativeEvent.deltaX < 0) {
      if (options.scales.x.min <= 0) {
        let forMin = 0;
        if (width <= 600) {
          setMaxVal(4);
        } else {
          setMaxVal(8);
        }
        setMinVal(0);
      } else {
        setMinVal(minVal - 1);
        setMaxVal(maxVal - 1);
      }
    }
  };

  return (
    <Line
      id="myChart"
      data={userData}
      options={options}
      onWheelCapture={(e) => scroller(e)}
    />
  );
};

export default Charts;
