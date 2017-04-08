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


    console.log("RelatedClasses: " + JSON.stringify(this.props.relatedClasses));
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
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;
    var countRelatedClasses = 0;
    console.log("______________________________________________________________");

    return (

      <SimpleFrame
        title="Next Classes"
      >
        <Stepper
          activeStep={this.state["stepIndex"]}
          linear={false}
          orientation="vertical"
        >         
          
          {this.props.relatedClasses.map((item) =>
            <Step key={item.unitOfClassesId}>

              <StepButton onTouchTap={() => this.setState({stepIndex: this.props.relatedClasses.indexOf(item)})}>                
                {item.startTime}
              </StepButton>
              <StepContent>
                <p>
                  {item.subject}
                  
                </p>
      
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
