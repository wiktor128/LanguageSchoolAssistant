import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import { syncHistoryWithStore } from 'react-router-redux';
import HomePage from './components/homePage';
import CallbackPage from './components/callback';
import LoginPage from './components/loginPage';
import MyProfilePage from './components/myProfilePage';
import StudentDashboardPage from './components/studentDashboardPage';
import LanguageInstructorDashboardPage from './components/languageInstructorDashboardPage';
import ManageGroupsPage from './components/manageGroupsPage';
import EditGroupPage from './components/manageGroupsPage/edit'
import ManageClasses from './components/manageClassesPage';
import UploadRelatedFiles from './components/languageInstructorDashboardPage/uploadRelatedFiles';

const history = syncHistoryWithStore(browserHistory, store);

export default function Routes(props) {
  return (
    <Router history={history}>
      <Route path="/" component={HomePage}/>
      <Route path="/callback" component={CallbackPage} />
      <Route path="/myprofile" component={MyProfilePage} />
      {/*<Route path="/groupPage" component={GroupPage} />*/}
      <Route path="/studentdashboard" component={StudentDashboardPage} />
      <Route path="/dashboard" component={LanguageInstructorDashboardPage} />

      <Route path="/managegroups" component={ManageGroupsPage} />
      <Route path="/editgroup" component={EditGroupPage} />

      <Route path="/manageclasses" component={ManageClasses} />

      <Route path="/uploadrelatedfiles" component={UploadRelatedFiles} />
    </Router>
  );
}
