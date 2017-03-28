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

import UsefulLinks from './usefulLinks';
import NextClasses from './nextClasses';


class LanguageInstructorDashboardPage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: this.props.profile
    };

  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart())
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
              Lecteur Dashboard
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

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInstructorDashboardPage);

