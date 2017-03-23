import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';

import SimpleFrame from '../simpleFrame';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import FingerprintIcon from 'material-ui/svg-icons/action/fingerprint';

class FeatureButton extends React.Component {
  static muiName = 'FlatButton';

  onLoginButtonClick = (event) => {
    // event.preventDefault();
  };

  render() {
    return (
      <IconButton touch={true} tooltip="inline string tooltip" >
        <FingerprintIcon />
      </IconButton>
    );
  }
}

class MyProfilePage extends React.Component {


  render() {
    
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <SimpleFrame
              title="Composition example"
              iconElementRight = {<FeatureButton />}
            >
              blah blah blah
            </SimpleFrame>
          </Col>
          <Col xs={12} md={6}>
            <SimpleFrame
              title="Composition example"
              iconElementRight = {<FingerprintIcon />}
            >
              blah blah blah
            </SimpleFrame>
          </Col>
          <Col xs={12} md={6}>
            <SimpleFrame
              title="Composition example"
            >
              blah blah blah
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
  }
}

export default MyProfilePage;
