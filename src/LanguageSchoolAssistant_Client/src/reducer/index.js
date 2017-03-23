import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import subscriptionsReducer from './subscriptions';
import testResourceReducer from './testResource';
import profileResourceReducer from './profileResource';

const reducer = combineReducers(
  {
    routing: routerReducer,
    oidc: oidcReducer,
    subscriptions: subscriptionsReducer,
    testResource: testResourceReducer,
    profileResource: profileResourceReducer
  }
);

export default reducer;
