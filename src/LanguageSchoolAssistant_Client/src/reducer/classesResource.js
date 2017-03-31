import { LOAD_CLASSES_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  relatedPersonalProfileId: "",
  sinceDate: null,
  monthsToLoad: null,
  classes: [],
  temporaryClasses: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign(
        {}, 
        {...state}, 
        {
          classes: [],
          relatedPersonalProfileId: "",
          sinceDate: null,
          monthsToLoad: null,
        }
      );
    case LOAD_CLASSES_SUCCESS:
      return Object.assign(
        {}, 
        {...state}, 
        {
          classes: action.payload
        }
      );
    default:
      return state;
  }
}
