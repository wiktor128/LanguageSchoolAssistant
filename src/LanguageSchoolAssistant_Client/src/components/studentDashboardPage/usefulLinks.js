import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

import {
  loadProfileResourceStart,
  updateProfileResourceStart,
  loadUsefulLinksStart
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
import Subheader from 'material-ui/Subheader';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HighlightOffIcon from 'material-ui/svg-icons/action/highlight-off';

class FeatureButton extends React.Component {
  render() {
    return (
      <IconButton touch={true} tooltip="Add new link" >
        <AddIcon />
      </IconButton>
    );
  }
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Remove link"
  >
    <HighlightOffIcon color={grey400} />
  </IconButton>
);

class UsefulLinks extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      usefulLinks: this.props.usefulLinks
    };
  }

  componentWillMount() {
    this.props.dispatch(loadUsefulLinksStart());
  }

  render() {
    return (
		<SimpleFrame
			title="Useful Links"
			iconElementRight = {<FeatureButton />}
		>
			<List>
				<ListItem
					rightIconButton={iconButtonElement}
					primaryText="Brendan Lim"
				/>
				<ListItem
					rightIconButton={iconButtonElement}
					primaryText="me, Scott, Jennifer"
				/>
				<ListItem
					rightIconButton={iconButtonElement}
					primaryText="Grace Ng"
				/>
				<ListItem
					rightIconButton={iconButtonElement}
					primaryText="Kerem Suer"
				/>
				<ListItem
					rightIconButton={iconButtonElement}
					primaryText="Raquel Parrado"
				/>
			</List>
        </SimpleFrame>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile,
    usefulLinks: state.usefulLinks.usefulLinks,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsefulLinks);
