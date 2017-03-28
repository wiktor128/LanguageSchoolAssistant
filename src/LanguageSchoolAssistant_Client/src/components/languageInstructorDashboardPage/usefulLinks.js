import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

import {
  loadProfileResourceStart,
  updateProfileResourceStart,
  loadUsefulLinksStart,
  updateUsefulLinksStart
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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HighlightOffIcon from 'material-ui/svg-icons/action/highlight-off';

class FeatureButton extends React.Component {
  render() {
    return (
      <IconButton touch={true} tooltip="Add new link" onClick={this.props.onClick} >
        <AddIcon />
      </IconButton>
    );
  }
}

/*const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Remove link"
    
  >
    <HighlightOffIcon color={grey400} />
  </IconButton>
);*/

class UsefulLinks extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      usefulLinks: this.props.usefulLinks,
      showDialog: false,
      newLink: this.props.newLink
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteUsefulLink = this.handleDeleteUsefulLink.bind(this);
  }

  handleShowDialog = () => {
    this.setState({showDialog: true});
  };

  handleCloseDialog = () => {
    this.setState({showDialog: false});
  };

  componentWillMount() {
    this.props.dispatch(loadUsefulLinksStart());
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("handle submit");

    this.props.dispatch(updateUsefulLinksStart());

    this.handleCloseDialog();
    // here do sth
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.newLink[name] = value;
    
    const val = {...this.state.newLink}; // deconstruct state.abc into a new object-- effectively making a copy
    val[name]=event.target.value;
    this.setState({newLink : val});

    console.log("this.props.usefulLinks: " + JSON.stringify(this.props.usefulLinks));
    console.log("this.props.newLink: " + JSON.stringify(this.props.newLink));
    console.log("this.state.newLink: " + JSON.stringify(this.state.newLink));
  }

  handleDeleteUsefulLink(event) {
    event.preventDefault();
    console.log("handleDeleteUsefulLink");
    console.log("event.target: " + JSON.stringify(event.target));
  }
  

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />
    ];

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="Remove link"
        tooltipPosition="bottom-left"
        onTouchTap={this.handleDeleteUsefulLink}
      >
        <HighlightOffIcon color={grey400} />
      </IconButton>
    );

    return (
      <SimpleFrame
        title="Useful Links"
        iconElementRight = {<FeatureButton onClick={this.handleShowDialog} />}
      >
        <List>
          {this.props.usefulLinks.map((item) =>
              <ListItem 
                key={item.usefulLinkId}
                rightIconButton={iconButtonElement}
                primaryText={item.title}
                href={item.link}
              />
            )}
        </List>
        
        <Dialog
          title="Add new link"
          actions={actions}
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.handleCloseDialog}
        >
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="title"
              value={this.props.newLink.title}
              floatingLabelText="Title"
              fullWidth={true}
              onChange={this.handleInputChange}
            />
            <TextField
              name="link"
              floatingLabelText="Link"
              value={this.props.newLink.link}
              fullWidth={true}
              onChange={this.handleInputChange}
            />
            <RaisedButton 
              type='submit' 
              label="Submit" 
              fullWidth={true}
            />
          </form>
        </Dialog>
      </SimpleFrame>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile,
    usefulLinks: state.usefulLinks.usefulLinks,
    newLink: state.usefulLinks.newLink
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsefulLinks);
