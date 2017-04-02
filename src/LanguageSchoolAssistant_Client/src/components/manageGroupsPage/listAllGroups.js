import React from 'react';
import { connect } from 'react-redux';

import {
  loadGroupsStart,
  updateGroupStart,
  deleteGroupStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import {lightGreen500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ListAllGroups extends React.Component {

  constructor (props) {
    super(props);
    this.state = {

    };

    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadGroupsStart());
  }

  handleDeleteGroup(id) {
    console.log("handle delete group");

    // for (var i=0; i < arguments.length; i++) {
    //     console.log('arguments[' + i + ']' + arguments[i]) ;
    // }

    this.props.temporaryGroup.studentsGroupId = id;
    this.props.dispatch(deleteGroupStart());
    
    console.log("id: " + id);
  }

  render() {
    return (
      <SimpleFrame
        title="Manage Course Groups"
      >
          <Table
            selectable={false}
            height='290px'
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              displayRowCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>Group Name</TableHeaderColumn>
                <TableHeaderColumn>Language</TableHeaderColumn>
                <TableHeaderColumn>Level</TableHeaderColumn>
                <TableHeaderColumn>Start Date</TableHeaderColumn>
                <TableHeaderColumn>End Date</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover={true}
              displayRowCheckbox={false}
            >
              {this.props.existingGroups.map((item) =>
                <TableRow rowNumber={item.studentsGroupId} key={item.studentsGroupId}>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.language}</TableRowColumn>
                  <TableRowColumn>{item.level}</TableRowColumn>
                  <TableRowColumn>{item.startDate}</TableRowColumn>
                  <TableRowColumn>{item.endDate}</TableRowColumn>
                  <TableRowColumn>
                    <FlatButton 
                      label="Edit" 
                      primary={true} />
                    <FlatButton 
                      label="Delete" 
                      secondary={true} 
                      onTouchTap={this.handleDeleteGroup.bind(this, item.studentsGroupId)} />
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </SimpleFrame>
    );
  }
}

const styles = {
  leftAlign: {
    textAlign: 'left',
  },
}

function mapStateToProps(state) {
  return {
    existingGroups: state.groupResource.existingGroups,
    existingLanguageInstructors: state.groupResource.existingLanguageInstructors,
    temporaryGroup: state.groupResource.temporaryGroup
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAllGroups);