import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import userManager from '../../utils/userManager';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {
  loadProfileResourceStart,
  loadInstructorScheduleStart
} from '../../actions';

import SimpleFrame from '../simpleFrame';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import styles from './scheduleTemplate/css/style.css';
//
import jquery from 'jquery'
window.$ = window.jQuery = jquery;

import './scheduleTemplate/js/jquery-3.0.0.min';
import './scheduleTemplate/js/modernizr';
import './scheduleTemplate/js/main';



class ScheduleTable extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: this.props.profile
    };

  }

  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart());
    this.props.dispatch(loadInstructorScheduleStart());
  }


  render() {
    console.log("schedule classes: " + JSON.stringify(this.props.classes));
    $(document).trigger('_schedule_page_ready');
    console.log("render ");
    return (
      <SimpleFrame
        title="Schedule"
        /*iconElementRight = {<FeatureButton />}*/
      >
        <div className="cd-schedule loading">
          <div className="timeline">
            <ul>
              <li><span>09:00</span></li>
              <li><span>09:30</span></li>
              <li><span>10:00</span></li>
              <li><span>10:30</span></li>
              <li><span>11:00</span></li>
              <li><span>11:30</span></li>
              <li><span>12:00</span></li>
              <li><span>12:30</span></li>
              <li><span>13:00</span></li>
              <li><span>13:30</span></li>
              <li><span>14:00</span></li>
              <li><span>14:30</span></li>
              <li><span>15:00</span></li>
              <li><span>15:30</span></li>
              <li><span>16:00</span></li>
              <li><span>16:30</span></li>
              <li><span>17:00</span></li>
              <li><span>17:30</span></li>
              <li><span>18:00</span></li>
            </ul>
          </div>

          <div className="events">
            <ul>
              <li className="events-group">
                <div className="top-info"><span>Monday</span></div>

                <ul>
                  <li className="single-event" data-start="09:30" data-end="10:30" data-content="event-abs-circuit" data-event="event-1">
                    <a href="#0">
                      <em className="event-name">Abs Circuit</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="11:00" data-end="12:30" data-content="event-rowing-workout" data-event="event-2">
                    <a href="#0">
                      <em className="event-name">Rowing Workout</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="14:00" data-end="15:15"  data-content="event-yoga-1" data-event="event-3">
                    <a href="#0">
                      <em className="event-name">Yoga Level 1</em>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="events-group">
                <div className="top-info"><span>Tuesday</span></div>

                <ul>
                  <li className="single-event" data-start="10:00" data-end="11:00"  data-content="event-rowing-workout" data-event="event-2">
                    <a href="#0">
                      <em className="event-name">Rowing Workout</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="11:30" data-end="13:00"  data-content="event-restorative-yoga" data-event="event-4">
                    <a href="#0">
                      <em className="event-name">Restorative Yoga</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="13:30" data-end="15:00" data-content="event-abs-circuit" data-event="event-1">
                    <a href="#0">
                      <em className="event-name">Abs Circuit</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="15:45" data-end="16:45"  data-content="event-yoga-1" data-event="event-3">
                    <a href="#0">
                      <em className="event-name">Yoga Level 1</em>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="events-group">
                <div className="top-info"><span>Wednesday</span></div>

                <ul>
                  <li className="single-event" data-start="09:00" data-end="10:15" data-content="event-restorative-yoga" data-event="event-4">
                    <a href="#0">
                      <em className="event-name">Restorative Yoga</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="10:45" data-end="11:45" data-content="event-yoga-1" data-event="event-3">
                    <a href="#0">
                      <em className="event-name">Yoga Level 1</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="12:00" data-end="13:45"  data-content="event-rowing-workout" data-event="event-2">
                    <a href="#0">
                      <em className="event-name">Rowing Workout</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="13:45" data-end="15:00" data-content="event-yoga-1" data-event="event-3">
                    <a href="#0">
                      <em className="event-name">Yoga Level 1</em>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="events-group">
                <div className="top-info"><span>Thursday</span></div>

                <ul>
                  <li className="single-event" data-start="09:30" data-end="10:30" data-content="event-abs-circuit" data-event="event-1">
                    <a href="#0">
                      <em className="event-name">Abs Circuit</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="12:00" data-end="13:45" data-content="event-restorative-yoga" data-event="event-4">
                    <a href="#0">
                      <em className="event-name">Restorative Yoga</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="15:30" data-end="16:30" data-content="event-abs-circuit" data-event="event-1">
                    <a href="#0">
                      <em className="event-name">Abs Circuit</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="17:00" data-end="18:30"  data-content="event-rowing-workout" data-event="event-2">
                    <a href="#0">
                      <em className="event-name">Rowing Workout</em>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="events-group">
                <div className="top-info"><span>Friday</span></div>

                <ul>
                  <li className="single-event" data-start="10:00" data-end="11:00"  data-content="event-rowing-workout" data-event="event-2">
                    <a href="#0">
                      <em className="event-name">Rowing Workout</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="12:30" data-end="14:00" data-content="event-abs-circuit" data-event="event-1">
                    <a href="#0">
                      <em className="event-name">Abs Circuit</em>
                    </a>
                  </li>

                  <li className="single-event" data-start="15:45" data-end="16:45"  data-content="event-yoga-1" data-event="event-3">
                    <a href="#0">
                      <em className="event-name">Yoga Level 1</em>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="event-modal">
            <header className="header">
              <div className="content">
                <span className="event-date"></span>
                <h3 className="event-name"></h3>
              </div>

              <div className="header-bg"></div>
            </header>

            <div className="body">
              <div className="event-info"></div>
              <div className="body-bg"></div>
            </div>

            <a href="#0" className="close">Close</a>
          </div>

          <div className="cover-layer"></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTable);

