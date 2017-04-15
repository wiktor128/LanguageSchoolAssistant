import { SHOW_SNACKBAR_MESSAGE, HIDE_SNACKBAR_MESSAGE } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
    snackbar_message: "",
    snackbar_show: false
  }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {snackbar_message: "", snackbar_show: false});
    case SHOW_SNACKBAR_MESSAGE:
      return Object.assign({}, {...state}, {snackbar_message: action.payload, snackbar_show: true});
    case HIDE_SNACKBAR_MESSAGE:
      return Object.assign({}, {...state}, {snackbar_show: false});
    default:
      return state;
  }
}
