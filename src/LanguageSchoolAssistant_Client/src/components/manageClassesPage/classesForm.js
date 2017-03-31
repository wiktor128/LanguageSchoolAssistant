import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { connect } from 'react-redux';

import {
  loadProfileResourceStart,
  loadGroupsStart,
  loadLanguageInstructorsStart,
  updateClassesStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import {lightGreen500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

import { Grid, Row, Col } from 'react-flexbox-grid';

class ClassesForm extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      value: null,

      existingStudentsGroups: this.props.existingGroups,



      unitOfClassesId: undefined,
      subject: undefined,
      shortDescription: undefined,
      startDate: undefined, // should be copied to startTime [redundant value, just for input purposes]
      startTime: undefined,
      endTime: undefined,
      studentsGroupId: null,
      languageInstructorPersonalProfileId: this.props.profile.PersonalProfileId,
      localizationId: undefined,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleStudentGroupChange = this.handleStudentGroupChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart());
    this.props.dispatch(loadGroupsStart());
    this.props.dispatch(loadLanguageInstructorsStart());
  }
  componentDidMount() {
    console.log("component did mount");

    console.log("this.props.existingGroups: " + JSON.stringify(this.props.existingGroups));
    console.log("this.state.existingGroups: " + JSON.stringify(this.state.existingGroups));
  }

  handleStartDateChange(event, date) {
    console.log("start date change");
    this.setState({startDate: JSON.stringify(date).substr(1, 10)});
  }

  handleStartTimeChange(event, date) {
    console.log("start time change");
    this.setState({startTime: JSON.stringify(date)});
  }

  handleEndTimeChange(event, date) {
    console.log("end time change");
    this.setState({endTime: JSON.stringify(date)});
  }

  handleStudentGroupChange(event, index, value) {
    console.log("handle level select change");
    console.log("index,value: " + index + " " + value);
    
    this.setState({studentsGroupId: value})
  }

  handleInputChange(event) {

    console.log("handle Input Change");

    for (var i=0; i < arguments.length; i++) {
        console.log('arguments[' + i + ']' + arguments[i]) ;
    }

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log("value: " + value);
    console.log("name: " + name);

    this.state[name] = value;

    this.forceUpdate();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handle submit");
    console.log("this.state: " + JSON.stringify(this.state));
    
    this.props.temporaryClasses.unitOfClassesId = this.state.unitOfClassesId,
    this.props.temporaryClasses.subject = this.state.subject,
    this.props.temporaryClasses.shortDescription = this.state.shortDescription,
    this.props.temporaryClasses.startDate = this.state.startDate, // should be copied to startTime [redundant value, just for input purposes]
    this.props.temporaryClasses.startTime = this.state.startTime,
    this.props.temporaryClasses.endTime = this.state.endTime,
    this.props.temporaryClasses.studentsGroupId = this.state.studentsGroupId,
    this.props.temporaryClasses.languageInstructorPersonalProfileId = this.state.languageInstructorPersonalProfileId,
    this.props.temporaryClasses.localizationId = this.state.localizationId,

    console.log("this.props.temporaryClasses: " + JSON.stringify(this.props.temporaryClasses) );

    this.props.dispatch(updateClassesStart());
                  //TODO Add Snackbar
    this.reset();
  }

  render() {

    return (
      <SimpleFrame
        title="Schedule Classes"
        /*iconElementRight = {<FeatureButton />}*/
      >
        <form onSubmit={this.handleSubmit}>
          <Row center='xs' start='md' bottom='xs' around='xs'>
            <Col xs={12} md={6}>
              <TextField
                value={this.state.subject}
                fullWidth={true}
                floatingLabelText="Subject"
                name="subject"
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row center='xs' start='md' bottom='xs' around='xs'>
            <Col xs={12} md={12}>
              <TextField
                value={this.state.shortDescription}
                fullWidth={true}
                multiLine={true}
                rows={2}
                rowsMax={4}
                floatingLabelText="Short Description"
                name="shortDescription"
                onChange={this.handleInputChange}
                style={styles.leftAlign}
              />
            </Col>
          </Row>
          <Row center='xs' start='md' bottom='xs' around='xs'>
            <Col xs={12} md={4}>
              <DatePicker 
                fullWidth={true}
                floatingLabelText="Date"
                mode="landscape"  
                name="startDate"
                onChange={this.handleStartDateChange}
              />
            </Col>
            <Col xs={12} md={4}>
              <TimePicker
                fullWidth={true}
                floatingLabelText="Start Time"
                format="24hr"
                hintText="24hr Format"
                onChange={this.handleStartTimeChange}
              />
            </Col>
            <Col xs={12} md={4}>
              <TimePicker
                fullWidth={true}
                floatingLabelText="End Time"
                format="24hr"
                hintText="24hr Format"
                onChange={this.handleEndTimeChange}
              />
            </Col>
          </Row>
          <Row center='xs' start='md' bottom='xs' around='xs'>
            <Col xs={12} md={12}>
            <SelectField
              fullWidth={true}
              floatingLabelText="Student Group"
              value={this.state.studentsGroupId}
              onChange={this.handleStudentGroupChange}
              autoWidth={true}
            >
            {this.props.existingGroups.map((item) =>
              <MenuItem key={item.studentsGroupId}
                value={item.studentsGroupId} 
                primaryText={item.language + ', ' + item.name + " " } //secodaryText is not included during width calculating
                secondaryText={ '' + item.level}
              />
            )}
              
            </SelectField>
            </Col>
          </Row>
          <Row center='xs' end='md' bottom='xs'>
            <Col xs={12} mdOffset={9} md={3}>
              <FlatButton 
                type='submit'
                style={styles.btnGreen}
                label="Create" 
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
  },
  customWidth: {
    width: 400,
  },
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile,
    existingGroups: state.groupResource.existingGroups,
    existingLanguageInstructors: state.groupResource.existingLanguageInstructors,
    temporaryClasses: state.classesResource.temporaryClasses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesForm);