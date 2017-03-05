import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

export default class TestConfigurationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            endpoint: ""
        }
    }

    handleNameChange = function(e) {
        //this.state.name = e.target.value;
        this.setState({
            name: e.target.value
        })
    }.bind(this);

    handleEndpointChange = function(e) {
        this.setState({
            endpoint: e.target.value
        })
        this.state.endpoint = e.target.value;
    }.bind(this);

    handleSubmit = function(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var endpoint = this.state.endpoint.trim();
        if (!name || !endpoint) {
            return;
        }
        this.props.onEndpointSubmit({
            name: name, 
            endpoint: endpoint
        });
        this.setState({
            name: '', 
            endpoint: ''
        });
        e.target.reset();
    }.bind(this);

    render() {
        return (
            <div>
                <form 
                    onSubmit={this.handleSubmit}
                >
                    <TextField
                        name="name"
                        type="text"
                        floatingLabelText="Name"
                        style={style}

                        onChange={this.handleNameChange}
                    />
                    <TextField
                        name="endpoint"
                        type="text"
                        floatingLabelText="SPARQL query endpoint URL"
                        style={style}

                        onChange={this.handleEndpointChange}
                    /> 

                    <RaisedButton 
                        label="Add New" 
                        style={style}
                        type="submit"
                    />
                </form>
            </div>
        );
    }
}