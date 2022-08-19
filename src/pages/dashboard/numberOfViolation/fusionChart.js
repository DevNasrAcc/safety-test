import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const FushionScroll = (props) => {
  const {
    categories,
    operatorArray,
    schoolArray,
    studentArray,
    valueType,
    inn,
  } = props;

  const [width, setWidth] = useState(window.innerWidth);
  const panel = useSelector((state) => state.leftState.leftState);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const chartConfigs = {
    type: "scrollstackedbar2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        numbersuffix: "",
        labelDisplay: "AUTO",
        numVisiblePlot: "7",
        stroke: "#F3F3F3",
        showYAxisValues: 0,
        legendPosition: width <= 1200 ? "bottom" : "bottom-left",
        interactiveLegend: "0",
        legendNumRows: 0,
        alignLegendWithCanvas: 0,
        legendCaptionAlignment: "Left",
        labelPadding: 3,
        chartLeftMargin: 0,
        chartLeftPadding: 0,
        chartRightPadding: 0,
        chartRightMargin: 0,
        xAxisPosition: "left",
        legendPadding: 0,
        chartBottomMargin: 0,
        showPercentInToolTip: 1,
        showaxislines: 0,
        legendItemFontSize: 9,
        legendItemFontColor: "rgba(152, 161, 176, 1)",
        legendItemFont: "MontserratRegular",
        toolTipBgColor: "#616161eb",
        toolTipColor: "#ffffff",
        toolTipBorderColor: "#616161eb",
        tooltipborderradius: 4,
        plottooltext: `<div class="arrow_box"><h2>$value ${valueType}</h2></div>`,
        formatNumber: 1,
        paletteColors: "#188E9C,#88CDD4,#9BA5CC,#98A1B0,#B3BBD8,#7A8597",
        showHoverEffect: 0,
        maxLabelWidthPercent: "17",
        theme: "fusion",
      },

      categories: [
        {
          category: categories,
        },
      ],
      dataset: [
        {
          data: operatorArray,
        },
        {
          data: schoolArray,
        },
        {
          data: studentArray,
        },
        {
          seriesname: "G4",
        },
        {
          seriesname: "G4",
        },
        {
          seriesname: "G6",
        },
        {
          seriesname: "G7",
        },
        {
          seriesname: "G8",
        },
        {
          seriesname: "G9",
        },
      ],
    },
  };

  return (
    <ReactFC
      {...chartConfigs}
      className={`${inn ? "chartByDay" : panel ? "pnChart" : "fushionChart"}`}
    />
  );
};

export default FushionScroll;
