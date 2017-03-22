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
        <AppBarHeader />
        <div style={styles.paper}>
          <div style={styles.content}>
            { props.children }
          </div>
        </div>
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
    //padding: '1em',
    flex: '1 1 auto',
  },
  container: {
    width: '100%'
  }
}

export default Root;
