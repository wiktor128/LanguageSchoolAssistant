import { LOAD_USEFUL_LINKS_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  usefulLinks: [],
  newLink: {title: "", link: ""}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {usefulLinks: []});
    case LOAD_USEFUL_LINKS_SUCCESS:
      return Object.assign({}, {...state}, {usefulLinks: action.payload});
    default:
      return state;
  }
}
