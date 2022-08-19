import React from "react";
import { useSelector } from "react-redux";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const FushionScroll = (props) => {
  const { data, categories, valueType, inn } = props;

  const panel = useSelector((state) => state.leftState.leftState);

  const chartConfigs = {
    type: "scrollbar2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        numbersuffix: "",
        labelDisplay: "AUTO",
        linethickness: "1",
        paletteColors: "#88CDD4, #188E9C, #9BA5CC",
        stroke: "#F3F3F3",
        showYAxisValues: 0,
        numVisiblePlot: "5",
        showLegend: 1,
        showValues: 0,
        chartLeftMargin: 0,
        chartRightMargin: 0,
        yAxisValueFont: "MontserratRegular",
        toolTipBgColor: "#616161eb",
        toolTipColor: "#ffffff",
        toolTipBorderColor: "#616161eb",
        tooltipborderradius: 4,
        scrollWidth: "0",
        plottooltext: `<div class="arrow_box"><h2>$value ${valueType}</h2></div>`,
        showHoverEffect: 0,
        maxLabelWidthPercent: "13",
        chartBottomMargin: 40,
        theme: "fusion",
      },

      categories: [
        {
          category: categories,
        },
      ],
      dataset: [
        {
          data: data,
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
