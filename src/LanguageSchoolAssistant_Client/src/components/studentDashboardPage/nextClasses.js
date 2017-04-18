import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

import {
  loadProfileResourceStart,
  updateProfileResourceStart,
  loadRelatedClassesStart,
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import { Grid, Row, Col } from 'react-flexbox-grid';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HighlightOffIcon from 'material-ui/svg-icons/action/highlight-off';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class NextClasses extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      stepIndex: 0,
    }
  }

  componentWillMount() {
    this.props.dispatch(loadRelatedClassesStart());

    // console.log("RelatedClasses: " + JSON.stringify(this.props.relatedClasses));
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
            targe="_blank"
          />
        )}
      </div>
    );
  }

  renderDownloadFileButton(dataFilePath) {
    console.log("::DATAFILEPATH:: " + dataFilePath);
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Download Materials"
          primary={true}
          href={"http://localhost:5001/Resource/DownloadFile/?DataFilePath=" + dataFilePath} //TODO
          disabled={dataFilePath == true ? false : true}
        />
      </div>
    );
  }

  
  threeNearestDates(relatedClassesList) {

    var temporaryList = [];

    if(relatedClassesList.length == 0) {
      return temporaryList;
    }

    for (var i = 0; i < relatedClassesList.length; i++) { 
      if(Date.parse(relatedClassesList[i].startTime) > Date.now()) {
        if(relatedClassesList[i - 1]) {
          temporaryList.push(relatedClassesList[i - 1]);
        }
        temporaryList.push(relatedClassesList[i]);
        if(relatedClassesList[i + 1]) {
          temporaryList.push(relatedClassesList[i + 1]);
        }
        break;
      }
    }
    if(temporaryList.length == 0 && relatedClassesList[relatedClassesList.length]) {
      temporaryList.push(relatedClassesList[relatedClassesList.length]);
      temporaryList.push(relatedClassesList[relatedClassesList.length - 1]);
      temporaryList.push(relatedClassesList[relatedClassesList.length - 2]);
    }
    console.log("threeNearestDates, temporaryList: " + JSON.stringify(temporaryList));
    return temporaryList;

  }

  render() {
    const {stepIndex} = this.state;
    var countRelatedClasses = 0;

    var threeNearestDates = this.threeNearestDates(this.props.relatedClasses);
    
    return (

      <SimpleFrame
        title="Next Classes"
      >
        <Stepper
          activeStep={this.state["stepIndex"]}
          linear={false}
          orientation="vertical"
        >         
          
          {threeNearestDates.map((item) =>
            <Step key={item.unitOfClassesId}>

              <StepButton onTouchTap={() => this.setState({stepIndex: threeNearestDates.indexOf(item)})}>                
                <strong>{item.startTime.substring(0, 10).replace(new RegExp("-","g"), ".")}</strong>
              </StepButton>
              <StepContent>
                <p>
                  {item.startTime.substring(12, 16).replace(new RegExp("-","g"), ":")}<br/>
                  {item.subject}
                  
                </p>

                {this.renderDownloadFileButton(item.dataFilePath)}
              </StepContent>
              
            </Step>
          )}
          
        </Stepper>
      </SimpleFrame>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile,
    relatedClasses: state.classesResource.relatedClasses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NextClasses);
