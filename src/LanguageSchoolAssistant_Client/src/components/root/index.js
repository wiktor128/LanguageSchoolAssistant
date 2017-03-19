import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBarHeader from '../appBarHeader';

import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

function Root(props) {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
        <AppBarHeader
          title="LSA"
        />
        { props.children }
      </div>
    </MuiThemeProvider>
  );
}

const styles = {
  paper: {
    padding: '1em',
    display: 'flex',
    margin: '0 auto',
  },
  content: {
    padding: '1em',
    flex: '1 0 auto',
    width: '100%'
  },
  container: {
    width: '100%',
    padding: '1em'
  }
}

export default Root;
