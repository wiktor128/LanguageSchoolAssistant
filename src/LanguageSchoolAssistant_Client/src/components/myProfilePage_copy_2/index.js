import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';
import validateContact from './validateContact';

import {
  loadProfileResourceStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import FingerprintIcon from 'material-ui/svg-icons/action/fingerprint';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class FeatureButton extends React.Component {
  render() {
    return (
      <IconButton touch={true} tooltip="inline string tooltip" >
        <FingerprintIcon />
      </IconButton>
    );
  }
}

class MyProfilePage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      firstName: this.props.profile.firstName,
      secondName: this.props.profile.secondName,
      email: this.props.profile.email,
      telephone: this.props.profile.telephone,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart())
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.profile[name] = value;

    this.setState({[name] : event.target.value});

    console.log("this.props.profile[name] " + this.props.profile[name]);
    console.log("value " + value);
    console.log("name " + name);
    console.log("target " + target);

    console.log("this.props.profile.email " + this.props.profile.email);
  }

  render() {

    return (
      <Grid fluid>
        <Row center='xs'>
          <Col xs={12} md={6}>
            <SimpleFrame
              title="Your Profile"
              /*iconElementRight = {<FeatureButton />}*/
            >
              <Row start='xs' middle='xs'>
                <Col xs={12} md={6}>

                </Col>
                <Col xs={12} md={6}>
                  <Table
                    selectable={false}
                    multiSelectable={false}
                  >
                    <TableBody
                      displayRowCheckbox={false}
                    >
                      <TableRow displayBorder={false}>
                        <TableRowColumn>First Name:</TableRowColumn>
                        <TableRowColumn>
                          <TextField
                            name='firstName'
                            hintText="Fill this field, please."
                            value={this.props.profile.firstName}
                            onChange={this.handleInputChange}
                          />
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={false}>
                        <TableRowColumn>Second Name:</TableRowColumn>
                        <TableRowColumn>
                          <TextField
                            name='secondName'
                            hintText="Fill this field, please."
                            value={this.props.profile.secondName}
                            onChange={this.handleInputChange}
                          />
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={false}>
                        <TableRowColumn>Contact Email:</TableRowColumn>
                        <TableRowColumn>
                          <TextField
                            name='email'
                            hintText="Fill this field, please."
                            value={this.props.profile.email}
                            onChange={this.handleInputChange}
                          />
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Telephone Number:</TableRowColumn>
                        <TableRowColumn>
                          <TextField
                            name='telephone'
                            hintText="Fill this field, please."
                            value={this.props.profile.telephone}
                            onChange={this.handleInputChange}
                          />
                        </TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Col>
              </Row>
            </SimpleFrame>
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
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);

