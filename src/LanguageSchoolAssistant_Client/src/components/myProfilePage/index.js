import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

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
  static muiName = 'FlatButton';

  render() {
    return (
      <IconButton touch={true} tooltip="inline string tooltip" >
        <FingerprintIcon />
      </IconButton>
    );
  }
}

class MyProfilePage extends React.Component {

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart())
  }

  render() {
   
    const profile = this.props.profile;

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
                      <TableRow>
                        <TableRowColumn>First Name:</TableRowColumn>
                        <TableRowColumn><strong>{profile.firstName}</strong></TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Second Name</TableRowColumn>
                        <TableRowColumn><strong>{profile.secondName}</strong></TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Contact Email</TableRowColumn>
                        <TableRowColumn><strong>{profile.email}</strong></TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Telephone Number</TableRowColumn>
                        <TableRowColumn><strong>{profile.telephone}</strong></TableRowColumn>
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

// export default MyProfilePage;

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

