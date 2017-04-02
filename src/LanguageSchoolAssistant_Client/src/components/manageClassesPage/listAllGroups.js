import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {
  loadProfileResourceStart,
  updateProfileResourceStart,

  loadGroupsStart,
  loadLanguageInstructorsStart,
  updateGroupStart

} from '../../actions';

import SimpleFrame from '../simpleFrame';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import {lightGreen500} from 'material-ui/styles/colors'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Snackbar from 'material-ui/Snackbar';

import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddGroupForm from './addGroupForm';

class ListAllGroups extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      value: null,
      startDate: this.props.temporaryGroup.startDate,
      endDate: this.props.temporaryGroup.endDate,
      levelSelectboxValue: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(loadGroupsStart());
    this.props.dispatch(loadLanguageInstructorsStart());

    console.log("list all groups, component will mount");
    console.log("this.props.existingGroups : " + this.props.existingGroups);
  }


  render() {

    return (
      <SimpleFrame
        title="Manage Course Groups"
        /*iconElementRight = {<FeatureButton />}*/
      >
          <Table
            selectable={false}
            height='300px'
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
                  <TableRowColumn>{item.level}</TableRowColumn>
                  <TableRowColumn>{item.language}</TableRowColumn>
                  <TableRowColumn>{item.startDate}</TableRowColumn>
                  <TableRowColumn>{item.endDate}</TableRowColumn>
                  <TableRowColumn>
                    <FlatButton label="Edit" primary={true} />
                    <FlatButton label="Delete" secondary={true} />
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
  btnGreen: {
    color: lightGreen500
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile,
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