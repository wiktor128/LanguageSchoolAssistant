import React from 'react';

import TestConfigurationList from './TestConfigurationList';
import TestConfigurationForm from './TestConfigurationForm';

export default class TestConfigurationBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: props.url,
            submitUrl: props.submitUrl
        }
    }

    loadEndpointsFromServer = function() {
        var xhr = new XMLHttpRequest();

        xhr.open('get', this.state.url, true);
        xhr.onload = function() {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    }.bind(this);

    componentDidMount() {
        this.loadEndpointsFromServer();
        window.setInterval(this.loadEndpointsFromServer, this.props.pollInterval);
    }

    handleEndpointSubmit = function(item) {

        var data = new FormData();
        data.append('name', item.name);
        data.append('endpoint', item.endpoint);


        var xhr = new XMLHttpRequest();

        //xhr.open('post', this.props.submitUrl, true);
        xhr.open('post', this.state.submitUrl, true);  

        xhr.onload = function() {
            this.loadEndpointsFromServer();
        }.bind(this);

        xhr.send(data);
    }.bind(this);

    render() {
        this.loadEndpointsFromServer();
        return (
            <div> 
                <TestConfigurationList tableData={this.state.data} />
                <TestConfigurationForm onEndpointSubmit={this.handleEndpointSubmit}/>
            </div>
        );
    }
}
