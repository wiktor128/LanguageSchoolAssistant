import { LOAD_GROUPS_SUCCESS, LOAD_LANGUAGE_INSTRUCTORS_SUCCESS } from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc';

const initialState = {
  existingGroups: [],
  existingLanguageInstructors: [],
  temporaryGroup: { 
    "level": "",
    "name": "",
    "startDate": "",
    "endDate": "",
    "language": ""
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign(
        {}, 
        {...state}, 
        {
          temporaryGroup: {}
        }
      );
    case LOAD_GROUPS_SUCCESS:
      return Object.assign(
        {}, 
        {...state}, 
        {
          existingGroups: action.payload
        }
      );
    case LOAD_LANGUAGE_INSTRUCTORS_SUCCESS:
      return Object.assign(
        {}, 
        {...state}, 
        {
          existingLanguageInstructors: action.payload
        }
      );
    default:
      return state;
  }
}
