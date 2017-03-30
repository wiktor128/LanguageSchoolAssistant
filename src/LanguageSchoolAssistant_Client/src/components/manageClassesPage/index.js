import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

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

import ClassesForm from './classesForm';
// import ListAllGroups from './listAllGroups';

class ManageClassesPage extends React.Component {

  constructor (props) {
    super(props);

    // this.state = {
    //   value: null,
    //   startDate: this.props.temporaryGroup.startDate,
    //   endDate: this.props.temporaryGroup.endDate,
    //   levelSelectboxValue: null,
    // };
  }

  componentWillMount() {
    // this.props.dispatch(loadProfileResourceStart());
    // this.props.dispatch(loadGroupsStart());
    // this.props.dispatch(loadLanguageInstructorsStart());
  }


  render() {

    return (
      <Grid fluid>
        <Row center='xs'>
          <Col xs={12} md={9}>
            <ClassesForm />
          </Col>
        </Row>
      </Grid>
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
    // user: state.oidc.user,
    // profile: state.profileResource.profile,
    // existingGroups: state.groupResource.existingGroups,
    // existingLanguageInstructors: state.groupResource.existingLanguageInstructors,
    // temporaryGroup: state.groupResource.temporaryGroup
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClassesPage);