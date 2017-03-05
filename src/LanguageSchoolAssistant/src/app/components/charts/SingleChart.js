import React from 'react';

import Chart from 'chart.js'
import TextField from 'material-ui/TextField';


export default class SingleChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            json_data: props.json_data
        }
    }

    componentDidMount = function() {
        var ctx = document.getElementById(this.state.id);
        let myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: this.state.json_data,
            options: {
                barPercentage: 0.5,
                categoryPercentage: 0.7,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }.bind(this);

    render() {
        return (
            <div>
                <TextField
                    hintText={this.state.id}
                    fullWidth={true}
                    disabled={true}
                />
                <canvas id={this.state.id} width="200" height="150"></canvas>
            </div>
        );
    }
}
