import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { connect } from 'react-redux';

import {
  // loadProfileResourceStart,
  loadGroupStart,
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


class EditGroupPage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      // value: null,
      // startDate: this.props.temporaryGroup.startDate,
      // endDate: this.props.temporaryGroup.endDate,
      // levelSelectboxValue: null,

      // level: this.props.temporaryGroup.level,
      // name: this.props.temporaryGroup.name,
      // startDate: this.props.temporaryGroup.startDate,
      // endDate: this.props.temporaryGroup.endDate,
      // language: this.props.temporaryGroup.language,
      // studentsGroupId: ""
    };

    this.handleEditGroupSubmit = this.handleEditGroupSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleLevelSelectChange = this.handleLevelSelectChange.bind(this);

  }

  componentWillMount() {
    this.props.temporaryGroup.studentsGroupId = this.props.location.query['id'];

    this.props.dispatch(loadGroupStart());
    this.props.dispatch(loadLanguageInstructorsStart());


        // this.props.temporaryGroup.studentsGroupId = null;

    // this.setState({
    //   name : this.props.temporaryGroup.name, 
    //   language : this.props.temporaryGroup.language, 
    //   level : this.props.temporaryGroup.level, 
    //   startDate : this.props.temporaryGroup.startDate, 
    //   endDate : this.props.temporaryGroup.endDate, 
    // });

    console.log("this.props.location.query['id']: " + this.props.location.query['id']);
    console.log("this.props.temporaryGroup: " + JSON.stringify(this.props.temporaryGroup));
    console.log("this.state: " + JSON.stringify(this.state));
  }

  handleStartDateChange(event, date) {
    this.props.temporaryGroup["startDate"] = date;
    //this.setState({startDate: JSON.stringify(date).substr(1, 10)});
    this.forceUpdate();
  }

  handleEndDateChange(event, date) {
    console.log("end date change");
    this.props.temporaryGroup["endDate"] = date;
    //this.setState({endDate: JSON.stringify(date).substr(1, 10)});
    this.forceUpdate();
  }

  handleLevelSelectChange(event, index, value) {
    console.log("handle level select change");
    console.log("index,value: " + index + " " + value);

    this.props.temporaryGroup['level'] = value;
    
    //this.setState({level: value});
    this.forceUpdate();
  }

  handleInputChange(event) {

    console.log("handle Input Change");

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log("value: " + value);
    console.log("name: " + name);

    this.props.temporaryGroup[name] = value;
    //this.state[name] = value;

    this.forceUpdate();
  }

  handleEditGroupSubmit(event) {
    event.preventDefault();
    console.log("handle new group submit function");
    console.log("this.props.existingLanguageInstructors: " + JSON.stringify(this.props.existingLanguageInstructors));
    console.log("this.props.existingGroups: " + JSON.stringify(this.props.existingGroups));
    console.log("this.props.temporaryGroup: " + JSON.stringify(this.props.temporaryGroup));


    this.props.dispatch(updateGroupStart());
    //this.reset(); //TODO Add Snackbar

  }

  render() {
    return (
      <Grid fluid>
      <Row center='xs'>
      <Col xs={12} md={6}>
      <SimpleFrame
        title="Edit Group Details"
        /*iconElementRight = {<FeatureButton />}*/
      >
        <form onSubmit={this.handleEditGroupSubmit}>
          <Row start='xs' middle='xs'>
            <Col xs={12} mdOffset={1} md={3} >
              Group name: 
            </Col>
            <Col xs={12} md={8}>
              <TextField
                value={this.props.temporaryGroup.name}
                fullWidth={true}
      
                name="name"
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row start='xs' middle='xs'>
            <Col xs={12} mdOffset={1} md={3} >
              Language: 
            </Col>
            <Col xs={12} md={8}>
              <TextField
                value={this.props.temporaryGroup.language}
                fullWidth={true}

                name="language"
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row start='xs' middle='xs'>
            <Col xs={12} mdOffset={1} md={3} >
              Level: 
            </Col>
            <Col xs={12} md={8}>
              <SelectField
                fullWidth={true}
              
                value={this.props.temporaryGroup.level}
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
          </Row>
          <Row start='xs' middle='xs'>
            <Col xs={12} mdOffset={1} md={3} >
              Start Date: 
            </Col>
            <Col xs={12} md={8}>
              <DatePicker 
                /*defaultDate={new Date(Date.parse(JSON.stringify(this.props.temporaryGroup.startDate)))}*/
                value={new Date(this.props.temporaryGroup.startDate)}
                fullWidth={true}
                mode="landscape"  
                name="startDate"
                onChange={this.handleStartDateChange}
              />
            </Col>
          </Row>
          <Row start='xs' middle='xs'>
            <Col xs={12} mdOffset={1} md={3} >
              End Date: 
            </Col>
            <Col xs={12} md={8}>
              <DatePicker
                value={new Date(this.props.temporaryGroup.endDate)}
                fullWidth={true}
                mode="landscape" 
                name="endDate"
                onChange={this.handleEndDateChange}
              />
            </Col>
          </Row>
          <Row start='xs' middle='xs'>
            <Col xs={12} mdOffset={1} md={3} >
              
            </Col>
            <Col xs={12} md={8}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupPage);