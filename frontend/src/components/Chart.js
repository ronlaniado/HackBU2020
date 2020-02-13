import React from "react";
import { Line } from 'react-chartjs-2';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const chartData = {
            datasets: [
              {
                label: 'MSFT',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.historyMSFT
              }
            ]
          };
        return (
          <Line
            width={500}
            height={650}
            data={chartData}
            options={{
              maintainAspectRatio: false,
              showLines: true,
              lineTension: 1,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 183.5,
                      max: 184.5
                    }
                  }
                ]
              }
            }}
          />
        );
    }
}