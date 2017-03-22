import React from 'react';

import Paper from 'material-ui/Paper';

import { createStyleSheet } from 'jss-theme-reactor';

import userManager from '../../utils/userManager';

import CodeExample from '../codeExample';

class MyProfilePage extends React.Component {


  render() {
    return (
      <CodeExample
        code={"sdfsdfsdfsdf"}
        title="Composition example"
      >
        blah blah blah
      </CodeExample>
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
