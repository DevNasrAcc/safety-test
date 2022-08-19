import React from "react";
import { useSelector } from "react-redux";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const FushionScroll = (props) => {
  const { data, valueType, inn } = props;

  const [width, setWidth] = React.useState(window.innerWidth);
  const panel = useSelector((state) => state.leftState.leftState);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const chartConfigs = {
    type: "pie2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        showvalues: false,
        showLabels: false,
        numbersuffix: "",
        labelDisplay: "AUTO",
        skipOverlapLabels: 1,
        paletteColors: "#88CDD4, #188E9C",
        legendPosition: "bottom",
        interactiveLegend: "0",
        legendItemFontSize: 9,
        legendNumRows: 0,
        legendIconScale: 0,
        minimiseWrappingInLegend: 1,
        alignLegendWithCanvas: 0,
        legendCaptionAlignment: "center",
        yAxisNamePadding: "0px",
        yAxisValuesPadding: "0px",
        valuePadding: 0,
        chartLeftMargin: 0,
        chartRightMargin: 0,
        legendPadding: 0,
        enableSmartLabels: 0,
        chartBottomMargin: width <= 1530 ? 0 : 8,
        legendItemFontColor: "rgba(152, 161, 176, 1)",
        legendItemFont: "MontserratRegular",
        pieRadius: inn
          ? 100
          : width <= 1920 && width >= 1831
          ? 100
          : width <= 1830 && width >= 1731
          ? 95
          : width <= 1730 && width >= 1601
          ? 85
          : width <= 1600 && width >= 1401
          ? 75
          : width <= 1400 && width >= 1101 && !panel
          ? 53
          : width <= 1400 && width >= 1101 && panel
          ? 50
          : width <= 1100 && width >= 601
          ? 63
          : width <= 600 && 55,
        enableSlicing: 0,
        useEllipsesWhenOverflow: 1,
        manageLabelOverflow: 1,
        toolTipBgColor: "#616161eb",
        toolTipColor: "#ffffff",
        toolTipBorderColor: "#616161eb",
        tooltipborderradius: 4,
        plottooltext: `<div class="arrow_box"><h2>$label: $value ${valueType}</h2></div>`,
        showHoverEffect: 0,
        theme: "fusion",
      },

      data: data,
    },
  };

  return (
    <ReactFC
      {...chartConfigs}
      className={`${inn ? "chartInModal" : panel ? "pnChart" : "fushionChart"}`}
    />
  );
};

export default FushionScroll;
