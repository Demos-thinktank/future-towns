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
                value: 16.2, 
                name: 'Midlands',     
                itemStyle: {
                    color: '#85CCD1'
                }
            }, 
            {
                value: 15.7, 
                name: 'North',     
                itemStyle: {
                    color: '#1d3336'
                }
            }, 
            {
                value: 68.1, 
                name: 'South',     
                itemStyle: {
                    color: '#EE7155'
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
                value: 11.7, 
                name: 'Midlands',     
                itemStyle: {
                    color: '#85CCD1'
                }
            }, 
            {
                value: 11.7, 
                name: 'North',     
                itemStyle: {
                    color: '#1d3336'
                }
            }, 
            {
                value: 76.6, 
                name: 'South',     
                itemStyle: {
                    color: '#EE7155'
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
    backgroundColor: 'whitesmoke',
    tooltip: {
        trigger: 'item',
        formatter: '{a}: {b} <br/> {c}%',
    },
    series: [
        {
            type: 'pie',
            name: selectedCategory,
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
                borderWidth: 2,
                borderColor: 'whitesmoke',
                borderStyle: 'solid'
            },
            data: currentDataSet
        }
    ]
};

    return (
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    )
}

export default RoseDiagram
