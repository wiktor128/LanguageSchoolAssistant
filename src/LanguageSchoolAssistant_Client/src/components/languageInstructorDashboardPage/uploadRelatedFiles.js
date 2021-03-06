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
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class UploadRelatedFiles extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: this.props.profile,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      searchText: '',
      autoCompleteDataSource: [],
      dataSourceConfig: {
        text: 'fullName',
        value: 'UnitOfClassesId'
      },
      unitOfClassesId: null
    };


    this.djsConfig = {
            addRemoveLinks: true,
            //acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false,
            params: {
                myParam: 'Hello from a parameter!',
                anotherParam: 43,
                unitOfClassesId: this.state.unitOfClassesId
            }
        };


    this.componentConfig = {
        //iconFiletypes: ['.jpg', '.png', '.gif'],
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

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart());

    //console.log("ALL CLASSES: " + JSON.stringify(this.props.classes));
    var availableClasses = [];
    var items = [];

    for(var propertyName in this.props.classes) {
      // propertyName is what you want
      // you can get the value like this: myObject[propertyName]
      
      //console.log("inside property: " + JSON.stringify(this.props.classes[propertyName]));
      availableClasses = availableClasses.concat(
                          this.props.classes[propertyName].map( (item)=> {
                            return Object.assign(
                                    {
                                      name: item.StudentsGroup.Name + ", " + 
                                            item.StartTime.replace("T"," ").substr(0, 16) + ", " + 
                                            item.Subject
                                    },
                                    {
                                      value: item.UnitOfClassesId
                                    }
                                   )
                          })
                         );
    }

    this.setState({
      items: availableClasses,
    });
  }

  menuItems(params) {
    return params.map((item) => (
      <MenuItem
        key={item.value}
        insetChildren={true}
        value={item.value}
        primaryText={item.name}
      />
    ));
  }


  handleFileAdded(file) {
    console.log(file);
  }

  handleChange = (event, index, value) => {
    console.log("handleChange");
    console.log("value: " + value);
    console.log("handleChange");
    this.setState(
      {unitOfClassesId: value}
    );

    this.djsConfig.params.unitOfClassesId = value;
  }

  handlePost() {
    this.dropzone.processQueue();
    //this.props.dispatch(showSnackbarMessage("Files upload."));
  }
 
  render() {    
    const config = this.componentConfig;
    //const djsConfig = this.djsConfig;

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
              <SelectField
                value={this.state.unitOfClassesId}
                onChange={this.handleChange}
                floatingLabelText="Floating Label Text"
                fullWidth={true}
                maxHeight={300}
              >
                {this.menuItems(this.state.items)}
              </SelectField>
            </Col>
          </Row>
          <Row middle="xs">
            <Col xs={12}>
              <DropzoneComponent 
                config={config}
                eventHandlers={eventHandlers}
                djsConfig={this.djsConfig} 
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

