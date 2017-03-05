import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TestConfigurationList from './testConfiguration/TestConfigurationList';
import TestConfigurationBox from './testConfiguration/TestConfigurationBox';

import SingleChart from './charts/SingleChart';
import MultiChart from './charts/MultiChart';


/**
 * Non-linear steppers allow users to enter a multi-step flow at any point.
 *
 * This example is similar to the regular horizontal stepper, except steps are no longer
 * automatically set to `disabled={true}` based on the `activeStep` prop.
 *
 * We've used the `<StepButton>` here to demonstrate clickable step labels.
 */
class HorizontalNonLinearStepper extends React.Component {

    state = {
        stepIndex: 0,
        result: [{"labels":["Query 1","Query 2","Query 3","Query 4","Query 5","Query 6","Query 7","Query 8","Query 9","Query 10","Query 11","Query 12"],"datasets":[{"label":"Apache_Fuseki","data":["0.002560","0.003524","0.002627","0.003015","0.002880","0.0","0.003063","0.002687","0.002046","0.002589","0.001957","0.003694"],"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgba(54, 162, 235, 1)","borderWidth":1},{"label":"Stardog","data":["0.003860","0.004323","0.003745","0.001906","0.030202","0.0","0.002410","0.002225","0.001477","0.001913","0.001324","0.002480"],"backgroundColor":"rgba(255, 206, 86, 0.2)","borderColor":"rgba(75, 192, 192, 1)","borderWidth":1}],"model_name":"Average Query Execution Time"},{"labels":["Query 1","Query 2","Query 3","Query 4","Query 5","Query 6","Query 7","Query 8","Query 9","Query 10","Query 11"],"datasets":[{"label":"Apache_Fuseki","data":["0.002513","0.003439","0.002564","0.002916","0.002807","0.002982","0.002629","0.001990","0.002528","0.001907","0.003635"],"backgroundColor":"rgba(153, 102, 255, 0.2)","borderColor":"rgba(255, 159, 64, 1)","borderWidth":1},{"label":"Stardog","data":["0.003782","0.004130","0.003649","0.001858","0.028554","0.002330","0.002163","0.001440","0.001870","0.001274","0.002405"],"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgba(54, 162, 235, 1)","borderWidth":1}],"model_name":"aqetg"},{"labels":["Query 1","Query 2","Query 3","Query 4","Query 5","Query 6","Query 7","Query 8","Query 9","Query 10","Query 11"],"datasets":[{"label":"Apache_Fuseki","data":["390.63","283.77","380.62","331.67","347.20","326.49","372.12","488.66","386.30","510.89","270.69"],"backgroundColor":"rgba(255, 206, 86, 0.2)","borderColor":"rgba(75, 192, 192, 1)","borderWidth":1},{"label":"Stardog","data":["259.04","231.33","267.01","524.72","33.11","415.02","449.39","677.04","522.84","755.50","403.22"],"backgroundColor":"rgba(153, 102, 255, 0.2)","borderColor":"rgba(255, 159, 64, 1)","borderWidth":1}],"model_name":"Queries per Second"},{"labels":["Query 1","Query 2","Query 3","Query 4","Query 5","Query 6","Query 7","Query 8","Query 9","Query 10","Query 11"],"datasets":[{"label":"Apache_Fuseki","data":["0.00142264","0.00166361","0.00132402","0.00147887","0.00144852","0.00153152","0.00129412","0.00076844","0.00122361","0.00104378","0.00196483"],"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgba(54, 162, 235, 1)","borderWidth":1},{"label":"Stardog","data":["0.00300280","0.00225132","0.00272256","0.00137846","0.01296529","0.00151278","0.00128832","0.00099022","0.00125440","0.00094337","0.00187692"],"backgroundColor":"rgba(255, 206, 86, 0.2)","borderColor":"rgba(75, 192, 192, 1)","borderWidth":1}],"model_name":"Min Query Execution Time"},{"labels":["Query 1","Query 2","Query 3","Query 4","Query 5","Query 6","Query 7","Query 8","Query 9","Query 10","Query 11"],"datasets":[{"label":"Apache_Fuseki","data":["0.00683920","0.04144486","0.00746663","0.01654421","0.01017759","0.01846932","0.00807576","0.00930606","0.01489666","0.00625997","0.00898432"],"backgroundColor":"rgba(153, 102, 255, 0.2)","borderColor":"rgba(255, 159, 64, 1)","borderWidth":1},{"label":"Stardog","data":["0.00743583","0.02871516","0.00882455","0.00602970","0.14382971","0.01132934","0.00531347","0.00501404","0.00441205","0.00796999","0.00565932"],"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgba(54, 162, 235, 1)","borderWidth":1}],"model_name":"Max Query Execution Time"}]
    };

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

    processAndLoadResults = function() {
        var xhr = new XMLHttpRequest();

        xhr.open('get', this.props.processUrl, true);
        xhr.onload = function() {

            var data = JSON.parse(xhr.responseText); // previously here was used JSON.parse(); but probably I don't need it
            
            this.setState({ result: data });

            ///HERE YOU CAN ACCESS YOUR DATA !!!!!!!!!!!!!!!!!!!!
            // alert(data);

        }.bind(this);
        xhr.send();

    }.bind(this);

    getStepContent = function(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Dataset Generation';
            case 1:
                return (
                    <div>
                        <TestConfigurationBox 
                            url="/endpoints"
                            submitUrl="/endpoints/new"
                            pollInterval={2000}
                            />
                        <RaisedButton 
                            label="Process" 
                            secondary={true} 
                            fullWidth={true} 
                            onClick={this.processAndLoadResults}
                        />
                    </div>

                );
            case 2:
                return (
                    <div>
                        <MultiChart data_list={this.state.result} />
                    </div>   
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }.bind(this)

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 0})}>
                            Dataset Generation
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 1})}>
                            Test Configuraiton
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                            Results
                        </StepButton>     
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>
                    {/*<div style={{marginTop: 12}}>
                        <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{marginRight: 12}}
                        />
                        <RaisedButton
                        label="Next"
                        disabled={stepIndex === 2}
                        primary={true}
                        onTouchTap={this.handleNext}
                        />
                    </div>*/}
                </div>
            </div>
        );
    }
}

export default HorizontalNonLinearStepper;