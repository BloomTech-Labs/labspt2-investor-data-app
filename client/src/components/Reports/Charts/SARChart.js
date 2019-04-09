import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { GuardSpinner } from "react-spinners-kit";
import { SpinnerContainer } from "../../Styles/Reports/Reports";

import { ChartCanvas, Chart } from "react-stockcharts";
import { SARSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { sar } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class SARChart extends React.Component {
  render() {
    const accelerationFactor = 0.02;
    const maxAccelerationFactor = 0.2;

    const defaultSar = sar()
      .options({
        accelerationFactor,
        maxAccelerationFactor
      })
      .merge((d, c) => {
        d.sar = c;
      })
      .accessor(d => d.sar);

    const { type, data: initialData, width, ratio } = this.props;

    const calculatedData = defaultSar(initialData);
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    if (!data.length) {
      return (
        <SpinnerContainer>
          <GuardSpinner size={30} frontColor="#373f51" backColor="#ff4400" />
        </SpinnerContainer>
      );
    }

    return (
      <ChartCanvas
        height={450}
        width={width}
        ratio={ratio}
        margin={{ left: 50, right: 90, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low, d.sar]]}
          padding={{ top: 60, bottom: 10 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <CandlestickSeries />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />

          <SARSeries yAccessor={d => d.sar} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <OHLCTooltip origin={[-40, 0]} />
          <SingleValueTooltip
            yLabel={`SAR (${accelerationFactor}, ${maxAccelerationFactor})`}
            yAccessor={d => d.sar}
            origin={[-40, 20]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

SARChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

SARChart.defaultProps = {
  type: "svg"
};
SARChart = fitWidth(SARChart);

export default SARChart;
