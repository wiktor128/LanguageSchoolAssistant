/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBarSimple from './components/AppBarSimple.js';
import TabsSimple from './components/TabsSimple';
import HorizontalNonLinearStepper from './components/HorizontalNonLinearStepper';

import Comment from './components/Comment';

const styles = {
    container: {
        textAlign: 'center'
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

        handleTouchTap = () => {
            this.setState({
                open: true,
            });
        }

        render() {
            const standardActions = (
              <FlatButton
                label="Ok"
              primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

        return (
          <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>

          <AppBarSimple
            title="Benchmarking RDF"
          />
          
          <HorizontalNonLinearStepper processUrl="process"/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
