import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';
import validateContact from './validateContact';

import {
  loadProfileResourceStart,
  updateProfileResourceStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import RaisedButton from 'material-ui/RaisedButton';
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
      profile: this.props.profile,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart())
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.profile[name] = value;

    const profile = {...this.state.profile}; // deconstruct state.abc into a new object-- effectively making a copy
    profile[name]=event.target.value;
    this.setState(profile);
  }

  handleSubmit(event) {
    // update redux 'profile' state
    // start some redux action to send this
    event.preventDefault();
    this.props.dispatch(updateProfileResourceStart());
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
                <Col xs={12} md={4}>

                </Col>
                <Col xs={12} md={8}>
                  <form onSubmit={this.handleSubmit}>
                    <Row middle='xs'>
                      <Col xs={6}> First Name: </Col>
                      <Col xs={6}>
                        <TextField
                          name='firstName'
                          hintText="Fill this field, please."
                          value={this.props.profile.firstName}
                          onChange={this.handleInputChange}
                          fullWidth={true}
                        />
                      </Col>
                    </Row>
                    <Row middle='xs'>
                      <Col xs={6}>Second Name:</Col>
                      <Col xs={6}>
                        <TextField
                          name='secondName'
                          hintText="Fill this field, please."
                          value={this.props.profile.secondName}
                          onChange={this.handleInputChange}
                          fullWidth={true}
                        />
                      </Col>
                    </Row>
                    <Row middle='xs'>
                      <Col xs={6}>Contact Email:</Col>
                      <Col xs={6}>
                        <TextField
                          name='email'
                          hintText="Fill this field, please."
                          value={this.props.profile.email}
                          onChange={this.handleInputChange}
                          fullWidth={true}
                        />
                      </Col>
                    </Row>
                    <Row middle='xs'>
                      <Col xs={6}>Telephone Number:</Col>
                      <Col xs={6}>
                        <TextField
                          name='telephone'
                          hintText="Fill this field, please."
                          value={this.props.profile.telephone}
                          onChange={this.handleInputChange}
                          fullWidth={true}
                        />
                      </Col>
                    </Row>
                    <Row middle='xs'>
                      <Col xs={12}>
                        <RaisedButton type='submit' label="Update Profile" fullWidth={true}/>
                      </Col>
                    </Row>
                  </form>
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

