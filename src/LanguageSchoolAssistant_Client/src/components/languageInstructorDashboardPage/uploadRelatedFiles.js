import React from 'react';
import ReactDOM from 'react-dom';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {
  loadProfileResourceStart,
  loadInstructorScheduleStart,
  showSnackbarMessage
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Grid, Row, Col } from 'react-flexbox-grid';

// import Dropzone from 'react-dropzone';
// import request from 'superagent';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'


class UploadRelatedFiles extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: this.props.profile,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
    };

    this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false,
            params: {
                myParam: 'Hello from a parameter!',
                anotherParam: 43,
                unitOfClassesId: "Hello from a ID parameter!"
            }

        };


    this.componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: 'https://localhost:44305/Resource/UploadFile',
    };

    // If you want to attach multiple callbacks, simply
    // create an array filled with all your callbacks.
    this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

    // Simple callbacks work too, of course
    this.callback = () => console.log('Hello!');

    this.success = file => console.log('uploaded', file);

    this.removedfile = file => console.log('removing...', file);

    this.dropzone = null;

  }

  // componentWillMount() {
  //   this.props.dispatch(loadProfileResourceStart());

  // }

  handleFileAdded(file) {
    console.log(file);
  }

  handlePost() {
    this.dropzone.processQueue();
    //this.props.dispatch(showSnackbarMessage("Files upload."));
  }
 
  render() {    
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
        init: dz => this.dropzone = dz,
        drop: this.callbackArray,
        addedfile: this.callback,
        success: this.success,
        removedfile: this.removedfile
    }

    return (
      <SimpleFrame
        title="Upload Related Files"
        /*iconElementRight = {<FeatureButton />}*/
      >
        <Grid>
          <Row middle="xs">
            <Col xs={12}>
              <DropzoneComponent 
                config={config}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig} 
              />
            </Col>
          </Row>
          <Row middle="xs">
            <Col xs={12}>
              <RaisedButton 
                onTouchTap={this.handlePost.bind(this)}
                label="Upload" 
                secondary={true} 
                fullWidth={true}
              />
            </Col>
          </Row>
        </Grid>
        {/*<button onClick={this.handlePost.bind(this)}>Upload</button>*/}
      </SimpleFrame>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile,
    classes: state.scheduleResource.classes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadRelatedFiles);

