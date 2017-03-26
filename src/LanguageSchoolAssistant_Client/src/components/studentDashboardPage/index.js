import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

import {
  loadProfileResourceStart,
  updateProfileResourceStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import Snackbar from 'material-ui/Snackbar'

import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import UsefulLinks from './usefulLInks';
import NextClasses from './nextClasses';


class StudentDashboardPage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: this.props.profile,
      showSnackbar: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart())
  }

  
  handleCloseSnackbar = () => {
    this.setState({
      showSnackbar: false,
    });
  };

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

    this.setState({showSnackbar: true});
  }

  render() {

    return (
      <Grid fluid>
        <Row center='xs'>
          <Col xs={12} md={3} style={styles.leftAlign}>
            <NextClasses />
          </Col>
          <Col xs={12} md={6}>
            <SimpleFrame
              title="List of Subjects"
              /*iconElementRight = {<FeatureButton />}*/
            >
              List of Subjects
            </SimpleFrame>

          </Col>
          <Col xs={12} md={3} style={styles.leftAlign}>
              <UsefulLinks />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboardPage);

