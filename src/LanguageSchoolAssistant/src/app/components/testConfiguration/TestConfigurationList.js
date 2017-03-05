import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

const tableData = [
  {
      name: 'Apache Fuseki',
      endpoint: 'http://localhost:8080/fuseki/n-triples/',
      selected: true,
  },
  {
      name: 'Stardog',
      endpoint: 'http://localhost:5820/n-triples-dataset/query',
      selected: true,
  },
  {
      name: 'Jena',
      endpoint: 'http://localhost:5820/jena/sparql/query',
      selected: true,
  },
  {
      name: 'Virtuoso',
      endpoint: 'http://localhost:5820/virtuoso',
  },
  {
      name: 'DB Pedia Online',
      endpoint: 'http://localhost:5820/wiki/dbpedia',
  },
  {
      name: 'Random',
      endpoint: 'http://localhost:5820/random/query',
  },
  {
      name: 'Adam Moore',
      endpoint: 'http://localhost:5820/FAke/lInK',
  },
];

export default class TestConfigurationList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: false,
            showCheckboxes: true,
            height: '300px',
        };
    }

    handleToggle = (event, toggled) => {
        this.setState({
          [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    render() {
        return (
          <div>
            <Table
              height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      selectable={this.state.selectable}
      multiSelectable={this.state.multiSelectable}
    >
      <TableHeader
      displaySelectAll={this.state.showCheckboxes}
      adjustForCheckbox={this.state.showCheckboxes}
      enableSelectAll={this.state.enableSelectAll}
    >
      <TableRow>
        <TableHeaderColumn colSpan="3" tooltip="List of SPARQ endpoints required to Benchmarking" style={{textAlign: 'center'}}>
          List of SPARQL URL Endpoints
        </TableHeaderColumn>
      </TableRow>
      <TableRow>
        <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
        <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
        <TableHeaderColumn tooltip="SPARQL URL Endpoint established to query operation.">
            SPARQ URL Endpoint
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={this.state.showCheckboxes}
      deselectOnClickaway={this.state.deselectOnClickaway}
      showRowHover={this.state.showRowHover}
      stripedRows={this.state.stripedRows}
      >
      {this.props.tableData.map( (row, index) => (
        <TableRow key={index} selected={row.selected}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{row.endpoint}</TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
);
}
}
