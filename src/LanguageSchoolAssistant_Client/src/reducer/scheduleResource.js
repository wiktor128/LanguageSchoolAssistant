import { LOAD_INSTRUCTOR_SCHEDULE_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  classes: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {classes: []});
    case LOAD_INSTRUCTOR_SCHEDULE_SUCCESS:
      return Object.assign({}, {...state}, {classes: action.payload});
    default:
      return state;
  }
}
