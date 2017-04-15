import React from 'react';
import { connect } from 'react-redux';

import userManager from '../../utils/userManager';
import { browserHistory } from 'react-router';

import {
  loadProfileResourceStart,
  hideSnackbarMessage
} from '../../actions';

import {
  SHOW_SNACKBAR_MESSAGE,
} from '../../constants';
import { take, put, select, call } from 'redux-saga/effects';
import store from '../../store';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Snackbar from 'material-ui/Snackbar'

import Logged from './logged';

class Login extends React.Component {
  static muiName = 'FlatButton';


  onLoginButtonClick = (event) => {
    event.preventDefault();
    userManager.signinRedirect();
  };

  render() {
    return (
      <FlatButton onClick={this.onLoginButtonClick} {...this.props} label="Login" />
    );
  }
}

class AppBarHeader extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      showSnackbar: true
    };

    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }



  componentDidMount() {
    console.log("AppHeader: Component Did Mount");
    console.log("general: " + JSON.stringify(this.props.general))
  }

  handleCloseSnackbar = () => {
    this.props.dispatch(hideSnackbarMessage());
  };

  render() {
    const { user } = this.props;
    
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>Language School Assistant</span>}
          onTitleTouchTap={() => browserHistory.push('/')}
          showMenuIconButton={false}
          iconElementRight={ !user || user.expired ? <Login /> : <Logged />}
        />
        {/*<Snackbar
          open={this.state.showSnackbar}
          message="Profile Updated"
          autoHideDuration={4000}
          onRequestClose={this.handleCloseSnackbar}
          action="OK"
          onActionTouchTap={this.handleCloseSnackbar}
        />*/}
        <Snackbar
          open={this.props.general.snackbar_show}
          message={this.props.general.snackbar_message}
          autoHideDuration={4000}
          onRequestClose={this.handleCloseSnackbar}
          action="OK"
          onActionTouchTap={this.handleCloseSnackbar}
        />
      </div>
    );
  }
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    //profile: state.profileResource.profile
    general: state.generalResource
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarHeader);