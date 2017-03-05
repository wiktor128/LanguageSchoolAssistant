import React from 'react';

import Chart from 'chart.js'
import TextField from 'material-ui/TextField';
import SingleChart from './SingleChart'


export default class MultiChart extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data_list: props.data_list
        }
    }

    componentDidMount = function() {
        // alert(this.state.data_list);
    }.bind(this);

    render = function() {
        return (
            <div>
                {this.state.data_list.map( (row, index) => (
                    <SingleChart key={row.model_name} id={row.model_name} json_data={row}/>
                ))}
               
            </div>
        );
    }.bind(this)
}
