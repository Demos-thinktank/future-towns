import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');

const Gauge = ({score}) => {
  const option = {
    series: [
      {
        type: "gauge",
        detail: { show: false },
        data: [{ value: score, name: "" }],
        axisLabel: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: [
              [0.25, "#85CCD1"],
              [0.75, "#E0F1F8"],
              [1, "#FEEBB3"],
            ],
            width: 22,
          },
        },
        axisTick: {
          show: true,
          splitNumber: 10,
          length: 10,
          lineStyle: {
            color: "#1d3336",
          },
        },
        splitLine: { show: false },
        clockwise: true,
      },
    ],
  };

  return (
    <>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </>
  );
};

export default Gauge;
