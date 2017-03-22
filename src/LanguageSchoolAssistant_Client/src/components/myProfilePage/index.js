import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';

import CodeExample from '../codeExample';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

class MyProfilePage extends React.Component {


  render() {
                /*<CodeExample
              code={"sdfsdfsdfsdf"}
              title="Composition example"
            >
              blah blah blah
            </CodeExample>
          </Col>
          <Col xs={12} md={3}>
            <CodeExample
              code={"sdfsdfsdfsdf"}
              title="Composition example"
            >
              blah blah blah
            </CodeExample>*/
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <CodeExample
              code={"sdfsdfsdfsdf"}
              title="Composition example"
            >
              blah blah blah
            </CodeExample>
          </Col>
          <Col xs={12} md={6}>
             <CodeExample
              code={"sdfsdfsdfsdf"}
              title="Composition example"
            >
              blah blah blah
            </CodeExample>
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
