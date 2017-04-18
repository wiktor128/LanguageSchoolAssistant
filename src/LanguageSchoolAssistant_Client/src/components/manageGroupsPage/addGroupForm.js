import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { connect } from 'react-redux';

import {
  loadGroupsStart,
  loadLanguageInstructorsStart,
  updateGroupStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import {lightGreen500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import AddIcon from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import { Grid, Row, Col } from 'react-flexbox-grid';


class AddGroupForm extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      level: "",
      name: "",
      startDate: "",
      endDate: "",
      language: "",
      studentsGroupId: ""
    };

    this.handleNewGroupSubmit = this.handleNewGroupSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleLevelSelectChange = this.handleLevelSelectChange.bind(this);

  }

  componentWillMount() {
    this.props.dispatch(loadGroupsStart());
    this.props.dispatch(loadLanguageInstructorsStart());
  }

  handleStartDateChange(event, date) {
    //this.props.temporaryGroup["startDate"] = JSON.stringify(date).substr(1, 10);
    this.setState({startDate: JSON.stringify(date).substr(1, 10)});
  }

  handleEndDateChange(event, date) {
    console.log("end date change");
    //this.props.temporaryGroup["endDate"] = JSON.stringify(date).substr(1, 10);
    this.setState({endDate: JSON.stringify(date).substr(1, 10)});
  }

  handleLevelSelectChange(event, index, value) {
    console.log("handle level select change");
    console.log("index,value: " + index + " " + value);

    //this.props.temporaryGroup['level'] = value;
    
    this.setState({level: value});
  }

  handleInputChange(event) {

    console.log("handle Input Change");

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log("value: " + value);
    console.log("name: " + name);

    //this.props.temporaryGroup[name] = value;
    this.state[name] = value;

    this.forceUpdate();
  }

  handleNewGroupSubmit(event) {
    event.preventDefault();
    console.log("handle new group submit function");
    console.log("this.props.existingLanguageInstructors: " + JSON.stringify(this.props.existingLanguageInstructors));
    console.log("this.props.existingGroups: " + JSON.stringify(this.props.existingGroups));
    console.log("this.props.temporaryGroup: " + JSON.stringify(this.props.temporaryGroup));


    this.props.temporaryGroup.studentsGroupId = null;
    this.props.temporaryGroup.name = this.state.name,
    this.props.temporaryGroup.language = this.state.language,
    this.props.temporaryGroup.level = this.state.level,
    this.props.temporaryGroup.startDate = this.state.startDate,
    this.props.temporaryGroup.endDate = this.state.endDate;

    this.props.dispatch(updateGroupStart());
    //this.reset(); //TODO Add Snackbar

  }

  render() {
    return (
      <SimpleFrame
        title="New Course Group"
        /*iconElementRight = {<FeatureButton />}*/
      >
        <form onSubmit={this.handleNewGroupSubmit}>
          <Row center='xs' bottom='xs' around='xs'>
            <Col xs={12} md>
              <TextField
                value={this.state.name}
                fullWidth={true}
                floatingLabelText="Group Name"
                name="name"
                onChange={this.handleInputChange}
              />
            </Col>
            <Col xs={12} md>
              <TextField
                value={this.state.language}
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
                value={this.state.level}
                name="level"
                onChange={this.handleLevelSelectChange}
                style={styles.leftAlign}
              >
                <MenuItem value='A1' key='A1' primaryText='A1' />
                <MenuItem value='A2' key='A2' primaryText='A2' />
                <MenuItem value='B1' key='B1' primaryText='B1' />
                <MenuItem value='B2' key='B2' primaryText='B2' />
                <MenuItem value='C1' key='C1' primaryText='C1' />
                <MenuItem value='C2' key='C2' primaryText='C2' />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupForm);