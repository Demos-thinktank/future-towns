import React from 'react'
import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');

const RoseDiagram = ({selectedCategory, selectedGroup}) => {
    const groupAData = {
        Age: [
            {
                value: 12.4, 
                name: '18-24',     
                itemStyle: {
                    color: '#EE7155'
                }
            },
            {
                value: 29.2, 
                name: '25-39',     
                itemStyle: {
                    color: '#85CCD1'
                }
            },
            {
                value: 35.3, 
                name: '40-59',     
                itemStyle: {
                    color: '#676C72'
                }
            },
            {
                value: 23.1, 
                name: '60+',     
                itemStyle: {
                    color: '#1D3336'
                }
            },                        
        ],
        Region: [
            {
                value: 6.2, 
                name: 'East Midlands',     
                itemStyle: {
                    color: 'darkcyan'
                }
            },
            {
                value: 20.2, 
                name: 'East of England',     
                itemStyle: {
                    color: '#85CCD1'
                }
            }, 
            {
                value: 3.8, 
                name: 'North East England',     
                itemStyle: {
                    color: 'darkred'
                }
            },
            {
                value: 8.1, 
                name: 'North West England',     
                itemStyle: {
                    color: 'black'
                }
            },
            {
                value: 33.3, 
                name: 'South East England',     
                itemStyle: {
                    color: '#1d3336'
                }
            }, 
            {
                value: 11.5, 
                name: 'South West England',     
                itemStyle: {
                    color: '#676C72'
                }
            },
            {
                value: 10.0, 
                name: 'West Midlands',     
                itemStyle: {
                    color: '#EE7155'
                }
            },
            {
                value: 3.9, 
                name: 'Yorkshire and the Humber',     
                itemStyle: {
                    color: 'darkgoldenrod'
                }
            },                                               
        ],
        "EU Referendum vote": [
            {
                value: 11.6, 
                name: 'Did not vote',     
                itemStyle: {
                    color: '#EE7155'
                }
            },
            {
                value: 34.0, 
                name: 'Leave',     
                itemStyle: {
                    color: '#85CCD1'
                }
            },
            {
                value: 0.5, 
                name: 'Prefer not to say',     
                itemStyle: {
                    color: '#676C72'
                }
            },
            {
                value: 53.9, 
                name: 'Remain',     
                itemStyle: {
                    color: '#1D3336'
                }
            },                                                
        ],
        "Future voting intention": [
            {
                value: 1.5, 
                name: 'Brexit Party',     
                itemStyle: {
                    color: 'darkgoldenrod'
                }
            },
            {
                value: 35.7, 
                name: 'Conservative',     
                itemStyle: {
                    color: '#1d3336'
                }
            },
            {
                value: 6.0, 
                name: 'Green Party',     
                itemStyle: {
                    color: 'darkcyan'
                }
            },
            {
                value: 7.5, 
                name: 'I would not vote',     
                itemStyle: {
                    color: '#676c72'
                }
            },
            {
                value: 34.3, 
                name: 'Labour',     
                itemStyle: {
                    color: '#ee7155'
                }
            },
            {
                value: 9.5, 
                name: 'Liberal Democrats',     
                itemStyle: {
                    color: '#85ccd1'
                }
            },
            {
                value: 3.9, 
                name: 'Other',     
                itemStyle: {
                    color: 'black'
                }
            },
            {
                value: 1.6, 
                name: 'UKIP',     
                itemStyle: {
                    color: 'darkred'
                }
            },                                                                                                
        ]
    }

    const groupBData = {
        Age: [
            {
                value: 9.0, 
                name: '18-24',     
                itemStyle: {
                    color: '#EE7155'
                }
            },
            {
                value: 22.5, 
                name: '25-39',     
                itemStyle: {
                    color: '#85CCD1'
                }
            },
            {
                value: 34.7, 
                name: '40-59',     
                itemStyle: {
                    color: '#676C72'
                }
            },
            {
                value: 33.9, 
                name: '60+',     
                itemStyle: {
                    color: '#1D3336'
                }
            },                        
        ],
        Region: [
            {
                value: 6.0, 
                name: 'East Midlands',     
                itemStyle: {
                    color: 'darkcyan'
                }
            },
            {
                value: 28.5, 
                name: 'East of England',     
                itemStyle: {
                    color: '#85CCD1'
                }
            }, 
            {
                value: 1.6, 
                name: 'North East England',     
                itemStyle: {
                    color: 'darkred'
                }
            },
            {
                value: 7.0, 
                name: 'North West England',     
                itemStyle: {
                    color: 'black'
                }
            },
            {
                value: 34.0, 
                name: 'South East England',     
                itemStyle: {
                    color: '#1d3336'
                }
            }, 
            {
                value: 14.1, 
                name: 'South West England',     
                itemStyle: {
                    color: '#676C72'
                }
            },
            {
                value: 5.8, 
                name: 'West Midlands',     
                itemStyle: {
                    color: '#ee7155'
                }
            },
            {
                value: 3.2, 
                name: 'Yorkshire and the Humber',     
                itemStyle: {
                    color: 'darkgoldenrod'
                }
            },                                               
        ],
        "EU Referendum vote": [
            {
                value: 13.6, 
                name: 'Did not vote',     
                itemStyle: {
                    color: '#EE7155'
                }
            },
            {
                value: 50.7, 
                name: 'Leave',     
                itemStyle: {
                    color: '#85CCD1'
                }
            },
            {
                value: 1.2, 
                name: 'Prefer not to say',     
                itemStyle: {
                    color: '#676C72'
                }
            },
            {
                value: 34.5, 
                name: 'Remain',     
                itemStyle: {
                    color: '#1D3336'
                }
            },                                                
        ],
        "Future voting intention": [
            {
                value: 4.3, 
                name: 'Brexit Party',     
                itemStyle: {
                    color: 'darkgoldenrod'
                }
            },
            {
                value: 42.9, 
                name: 'Conservative',     
                itemStyle: {
                    color: '#1d3336'
                }
            },
            {
                value: 3.6, 
                name: 'Green Party',     
                itemStyle: {
                    color: 'darkcyan'
                }
            },
            {
                value: 12.3, 
                name: 'I would not vote',     
                itemStyle: {
                    color: '#676c72'
                }
            },
            {
                value: 25.4, 
                name: 'Labour',     
                itemStyle: {
                    color: '#ee7155'
                }
            },
            {
                value: 7.2, 
                name: 'Liberal Democrats',     
                itemStyle: {
                    color: '#85ccd1'
                }
            },
            {
                value: 3.1, 
                name: 'Other',     
                itemStyle: {
                    color: 'black'
                }
            },
            {
                value: 1.2, 
                name: 'UKIP',     
                itemStyle: {
                    color: 'darkred'
                }
            },                                                                                                
        ]
    }

    const currentDataSet = selectedGroup === 'A' ? groupAData[selectedCategory] : groupBData[selectedCategory]

    const option = {
    // title: {
    //     text: 'Title',
    //     subtext: 'Sub Title',
    //     left: 'center'
    // },
    backgroundColor: 'whitesmoke',
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {d}%',
        // position: ['50%', '50%']
    },
    series: [
        {
            type: 'pie',
            name: selectedCategory,
            // radius: [20, 110],
            // center: ['50%', '50%'],
            // roseType: 'radius',
            top: 20,
            bottom: 5,
            left: 3,
            right: 3,
            label: {
                show: true,
                fontFamily: 'Avenir' ,
                fontSize: 18,
                fontWeight: 'bold',
                padding: 4
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'whitesmoke',
                borderStyle: 'solid'
            },
            // emphasis: {
            //     label: {
            //         show: true
            //     }
            // },
            data: currentDataSet
        }
    ]
};

    return (
    // <div style={{overflow: 'hidden'}}>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    // </div>
    )
}

export default RoseDiagram
