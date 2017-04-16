import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../loginPage';
import MainPage from '../mainPage';

import {
  loadProfileResourceStart,
  updateProfileResourceStart
} from '../../actions';

import LanguageInstructorDashboardPage from '../languageInstructorDashboardPage';
import StudentDashboardPage from  '../studentDashboardPage'

class HomePage extends React.Component {
  get infoPage() {
    return(
      <div>Info Page</div>
    );
  }
  componentWillMount() {
    this.props.dispatch(loadProfileResourceStart());
  }

  render() {

    const { user } = this.props;

    return !user || user.expired 
      ? <LoginPage/> 
      : ( user.profile.roles == "LanguageInstructor" 
          ? <LanguageInstructorDashboardPage /> 
          : <StudentDashboardPage />
        );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    profile: state.profileResource.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
