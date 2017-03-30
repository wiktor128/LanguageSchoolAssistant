import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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
          <Col xs={12} md={9}>
            <SimpleFrame
              title="Schedule"
              /*iconElementRight = {<FeatureButton />}*/
            >
                <Table
                  selectable={false}
                >
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    displayRowCheckbox={false}
                  >
                    <TableRow>
                      <TableHeaderColumn>Monday</TableHeaderColumn>
                      <TableHeaderColumn>Tuesday</TableHeaderColumn>
                      <TableHeaderColumn>Wednesday</TableHeaderColumn>
                      <TableHeaderColumn>Thursday</TableHeaderColumn>
                      <TableHeaderColumn>Friday</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    showRowHover={true}
                    displayRowCheckbox={false}
                  >
                    <TableRow>
                      <TableRowColumn>1</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>2</TableRowColumn>
                      <TableRowColumn>Randal White</TableRowColumn>
                      <TableRowColumn>Unemployed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>3</TableRowColumn>
                      <TableRowColumn>Stephanie Sanders</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>4</TableRowColumn>
                      <TableRowColumn>Steve Brown</TableRowColumn>
                      <TableRowColumn>Employed</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                      <TableRowColumn>John Smith</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
            </SimpleFrame>

          </Col>
          <Col xs={12} md={3} style={styles.leftAlign}>
              <SimpleFrame
                title="Quick Actions"
              >
                <RaisedButton 
                  secondary={true} 
                  label="Schedule Next Classes" 
                  onTouchTap = {() => browserHistory.push('/manageclasses')} 
                  fullWidth={true} />
                <br /><br />
                <RaisedButton 
                  primary={true} 
                  label="Manage Student Groups" 
                  onTouchTap = {() => browserHistory.push('/managegroups')} 
                  fullWidth={true} />
                <br /><br />
                <RaisedButton 
                  primary={true} 
                  label="Add New Content" 
                  fullWidth={true} />
                <br /><br />
                <RaisedButton 
                  primary={true} 
                  label="Contact Students" 
                  fullWidth={true} />
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

