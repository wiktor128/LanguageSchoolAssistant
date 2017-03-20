import { LOAD_TEST_RESOURCE_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  message: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {message: []});
    case LOAD_TEST_RESOURCE_SUCCESS:
      return Object.assign({}, {...state}, {message: action.payload});
    default:
      return state;
  }
}
