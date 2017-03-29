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

class ManageGroupsPage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      value: null,
      startDate: this.props.temporaryGroup.startDate,
      endDate: this.props.temporaryGroup.endDate,
    };

    this.handleNewGroupSubmit = this.handleNewGroupSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleLevelSelectChange = this.handleLevelSelectChange.bind(this);

  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart());
    this.props.dispatch(loadGroupsStart());
    this.props.dispatch(loadLanguageInstructorsStart());
  }

  handleChange = (event, index, value) => this.setState({value});

  handleStartDateChange(event, date) {
    console.log("start date change");
    this.props.temporaryGroup["startDate"] = date;
  }

  handleEndDateChange(event, date) {
    console.log("end date change");
    this.props.temporaryGroup["endDate"] = date;
  }

  handleLevelSelectChange(event, index, value) {
    console.log("handle level select change");
    console.log("index,value: " + index + " " + value);
    this.props.temporaryGroup["level"] = value;
  }

  // handleInputChange(event, date) {
  //   console.log("handle Input Change");

  //   for (var i=0; i < arguments.length; i++) {
  //       console.log('arguments[' + i + ']' + arguments[i]) ;
  //   }


  //   var target, name, value;
  //   if (!date) { // check wheather input is build with datePicker component
  //     value = (target.type === 'checkbox') ? target.checked : target.value;
  //     target = event.target;
  //     name = target.name;
  //   } else {
  //     console.log("elsee");
  //     value = date;
  //     target = event.target;
  //     name = target.name;
  //   }
    

  //   this.props.temporaryGroup[name] = value;

  //   console.log("this.props.temporaryGroup: " + JSON.stringify(this.props.temporaryGroup));
  // }
  handleInputChange(event) {

    console.log("handle Input Change");

    for (var i=0; i < arguments.length; i++) {
        console.log('arguments[' + i + ']' + arguments[i]) ;
    }

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.temporaryGroup[name] = value;

    console.log("this.props.temporaryGroup: " + JSON.stringify(this.props.temporaryGroup));
  }

  handleNewGroupSubmit(event) {
    event.preventDefault();
    console.log("handle new group submit function");
    console.log("this.props.existingLanguageInstructors: " + JSON.stringify(this.props.existingLanguageInstructors));
    console.log("this.props.existingGroups: " + JSON.stringify(this.props.existingGroups));
    console.log("this.props.temporaryGroup: " + JSON.stringify(this.props.temporaryGroup));

    this.props.dispatch(updateGroupStart());
  }

  render() {

    return (
      <Grid fluid>
        <Row center='xs'>
          <Col xs={12} md={12}>
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
                    <TableRow rowNumber={1}>
                      <TableRowColumn>1</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow rowNumber={2}>
                      <TableRowColumn>2</TableRowColumn>
                      <TableRowColumn>Randal White</TableRowColumn>
                      <TableRowColumn>Unemployed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow rowNumber={3}>
                      <TableRowColumn>3</TableRowColumn>
                      <TableRowColumn>Stephanie Sanders</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow rowNumber={4}>
                      <TableRowColumn>4</TableRowColumn>
                      <TableRowColumn>Steve Brown</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow rowNumber={5}>
                      <TableRowColumn>5</TableRowColumn>
                      <TableRowColumn>Steve Brown</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow rowNumber={6}>
                      <TableRowColumn>6</TableRowColumn>
                      <TableRowColumn>Steve Brown</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow rowNumber={7}>
                      <TableRowColumn>7</TableRowColumn>
                      <TableRowColumn>Steve Brown</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton label="Edit" primary={true} />
                        <FlatButton label="Delete" secondary={true} />
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
            </SimpleFrame>
          </Col>
          <Col xs={12} md={12}>
            <SimpleFrame
              title="New Course Group"
              /*iconElementRight = {<FeatureButton />}*/
            >
              <form onSubmit={this.handleNewGroupSubmit}>
                <Row center='xs' bottom='xs' around='xs'>
                  <Col xs={12} md>
                    <TextField
                      value={this.props.temporaryGroup.name}
                      fullWidth={true}
                      floatingLabelText="Group Name"
                      name="name"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md>
                    <TextField
                      value={this.props.temporaryGroup.language}
                      fullWidth={true}
                      floatingLabelText="Language"
                      name="language"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md>
                    <SelectField
                      fullWidth={true}
                      floatingLabelText="Level"
                      name="level"
                      onChange={this.handleLevelSelectChange}
                      style={styles.leftAlign}
                    >
                      <MenuItem value={null} primaryText="" />
                      <MenuItem value="A1" primaryText="A1" />
                      <MenuItem value="A2" primaryText="A2" />
                      <MenuItem value="B1" primaryText="B1" />
                      <MenuItem value="B2" primaryText="B2" />
                      <MenuItem value="C1" primaryText="C1" />
                      <MenuItem value="C2" primaryText="C2" />
                    </SelectField>
                  </Col>
                  <Col xs={12} md>
                    <DatePicker 
             
                      fullWidth={true}
                      floatingLabelText="Start Date"
                      mode="landscape"  
                      name="startDate"
                      onChange={this.handleStartDateChange}
                    />
                  </Col>
                  <Col xs={12} md>
                    <DatePicker
                  
                      fullWidth={true}
                      floatingLabelText="End Date"
                      mode="landscape" 
                      name="endDate"
                      onChange={this.handleEndDateChange}
                    />
                  </Col>
                  <Col xs={12} md={1}>
                    <FlatButton 
                      type='submit'
                      style={styles.btnGreen}
                      label="Add" 
                      icon={<AddIcon />}
                    />
                  </Col>
                </Row>
              </form>
            </SimpleFrame >
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexShrink: 1,
  },
  simpleTextBox: {
    marginLeft: 20,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageGroupsPage);