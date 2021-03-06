import React from 'react';
import { connect } from 'react-redux';

import userManager from '../../utils/userManager';
import { browserHistory } from 'react-router';

import {
  loadProfileResourceStart
} from '../../actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


class Logged extends React.Component {
  static muiName = "IconMenu";

  componentWillMount() {
      this.props.dispatch(loadProfileResourceStart());
  }

  // log out
  onLogoutButtonClicked = (event) => {
    event.preventDefault();
    userManager.removeUser(); // removes the user data from sessionStorage
    userManager.signoutRedirectCallback();
    userManager.signoutRedirect();
  }

  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="My profile" onClick={() => browserHistory.push('/myprofile')}/>
        <MenuItem primaryText="Sign out" onClick={this.onLogoutButtonClicked} />
      </IconMenu>
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
    profile: state.profileResource.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logged);