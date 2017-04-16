import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import subscriptionsReducer from './subscriptions';
import testResourceReducer from './testResource';
import profileResourceReducer from './profileResource';
import { reducer as formReducer } from 'redux-form';
import usefulLinksReducer from './usefulLinks';
import groupsReducer from './groupsResource';
import classesReducer from './classesResource';
import generalReducer from './general';
import scheduleReducer from './scheduleResource';

const reducer = combineReducers(
  {
    routing: routerReducer,
    oidc: oidcReducer,
    subscriptions: subscriptionsReducer,
    testResource: testResourceReducer,
    profileResource: profileResourceReducer,
    form: formReducer,
    groupResource: groupsReducer,
    usefulLinks: usefulLinksReducer,
    classesResource: classesReducer,
    generalResource: generalReducer,
    scheduleResource: scheduleReducer
  }
);

export default reducer;
