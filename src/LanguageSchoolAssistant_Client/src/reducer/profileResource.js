import { LOAD_PROFILE_RESOURCE_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  profile: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {profile: []});
    case LOAD_PROFILE_RESOURCE_SUCCESS:
      return Object.assign({}, {...state}, {profile: action.payload});
    default:
      return state;
  }
}
