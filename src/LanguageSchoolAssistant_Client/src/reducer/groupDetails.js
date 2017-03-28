import { LOAD_GROUP_DETAILS_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  groupDetails: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {groupDetails: []});
    case LOAD_GROUP_DETAILS_SUCCESS:
      return Object.assign({}, {...state}, {groupDetails: action.payload});
    default:
      return state;
  }
}
