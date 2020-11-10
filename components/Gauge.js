import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');

const Gauge = ({score}) => {
  const option = {
    // tooltip: {
    //     formatter: '{a} <br/>{b} : {c}%'
    // },
    // toolbox: {
    //     feature: {
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    series: [
      {
        // name: '业务指标',
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

        // detail: {
        //     show: true ,
        //     width ... ,
        //     height ... ,
        //     backgroundColor: 'transparent' ,
        //      }
        splitLine: { show: false },
        clockwise: true,
        //   startAngle: 180,
        //   endAngle: 0,
      },
    ],
  };

  return (
    <>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        //   theme={"theme_name"}
        //   onChartReady={this.onChartReadyCallback}
        //   onEvents={EventsDict}
        //   opts={}
      />
    </>
  );
};

export default Gauge;
