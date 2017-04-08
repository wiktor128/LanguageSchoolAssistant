import { 
  LOAD_SUBSCRIPTIONS_START, 
  LOAD_SUBSCRIPTIONS_SUCCESS,
  
  LOAD_TEST_RESOURCE_START,
  LOAD_TEST_RESOURCE_SUCCESS,

  LOAD_PROFILE_RESOURCE_START,
  LOAD_PROFILE_RESOURCE_SUCCESS,

  UPDATE_PROFILE_RESOURCE_START,
  UPDATE_PROFILE_RESOURCE_SUCCESS,

  LOAD_GROUP_DETAILS_START,
  LODD_GROUP_DETAILS_SUCCESS,

  LOAD_USEFUL_LINKS_START,
  LOAD_USEFUL_LINKS_SUCCESS,
  UPDATE_USEFUL_LINKS_START,
  UPDATE_USEFUL_LINKS_SUCCESS,

  LOAD_GROUP_START,
  LOAD_GROUP_SUCCESS,
  LOAD_GROUPS_START,
  LOAD_GROUPS_SUCCESS,
  UPDATE_GROUP_START,
  UPDATE_GROUP_SUCCESS,
  DELETE_GROUP_START,
  DELETE_GROUP_SUCCESS,

  LOAD_STUDENTS_START,
  LOAD_STUDENTS_SUCCESS,
  UPDATE_STUDENTS_GROUP_START,
  UPDATE_STUDENTS_GROUP_SUCCESS,

  LOAD_LANGUAGE_INSTRUCTORS_START,
  LOAD_LANGUAGE_INSTRUCTORS_SUCCESS,

  LOAD_CLASSES_START,
  LOAD_CLASSES_END,
  UPDATE_CLASSES_START,
  UPDATE_CLASSES_END,

  LOAD_RELATED_CLASSES_START,
  LOAD_RELATED_CLASSES_SUCCESS,
  
} from '../constants';


export function loadClassesStart() {
  return {
    type: LOAD_CLASSES_START
  };
}
export function loadClassesSuccess(classes) {
  return {
    type: LOAD_CLASSES_SUCCESS,
    payload: classes
  };
}
export function updateClassesStart() {
  return {
    type: UPDATE_CLASSES_START
  };
}
export function updateClassesSuccess(classes) {
  return {
    type: UPDATE_CLASSES_SUCCESS,
    payload: classes
  };
}

export function loadRelatedClassesStart() {
  return {
    type: LOAD_RELATED_CLASSES_START
  };
}
export function loadRelatedClassesSuccess(relatedClasses) {
  return {
    type: LOAD_RELATED_CLASSES_SUCCESS,
    payload: relatedClasses
  };
}


export function loadUsefulLinksStart() {
  return {
    type: LOAD_USEFUL_LINKS_START
  };
}
export function loadUsefulLinksSuccess(usefulLinks) {
  return {
    type: LOAD_USEFUL_LINKS_SUCCESS,
    payload: usefulLinks
  };
}

export function loadGroupsStart() {
  return {
    type: LOAD_GROUPS_START
  };
}
export function loadGroupsSuccess(existingGroups) {
  return {
    type: LOAD_GROUPS_SUCCESS,
    payload: existingGroups
  };
}
export function loadGroupStart() {
  return {
    type: LOAD_GROUP_START
  };
}
export function loadGroupSuccess(temporaryGroup) {
  return {
    type: LOAD_GROUP_SUCCESS,
    payload: temporaryGroup
  };
}
export function updateGroupStart() {
  return {
    type: UPDATE_GROUP_START
  };
}
export function deleteGroupStart() {
  return {
    type: DELETE_GROUP_START
  };
}

export function loadStudentsStart() {
  return {
    type: LOAD_STUDENTS_START
  };
}
export function loadStudentsSuccess(existingStudents) {
  return {
    type: LOAD_STUDENTS_SUCCESS,
    payload: existingStudents
  };
}
export function updateStudentsGroupStart(temporaryStudentsToUpdateGroup) {
  return {
    type: UPDATE_STUDENTS_GROUP_START,
    payload: temporaryStudentsToUpdateGroup
  };
}

export function loadLanguageInstructorsStart() {
  return {
    type: LOAD_LANGUAGE_INSTRUCTORS_START
  };
}
export function loadLanguageInstructorsSuccess(existingLanguageInstructors) {
  return {
    type: LOAD_LANGUAGE_INSTRUCTORS_SUCCESS,
    payload: existingLanguageInstructors
  };
}

export function updateUsefulLinksStart() {
  return {
    type: UPDATE_USEFUL_LINKS_START
  };
}
export function updateUsefulLinksSuccess(usefulLinks) {
  return {
    type: UPDATE_USEFUL_LINKS_SUCCESS,
    payload: usefulLinks
  };
}


export function loadSubscriptionsStart() {
  return {
    type: LOAD_SUBSCRIPTIONS_START
  };
}
export function loadSubscriptionsSuccess(channels) {
  return {
    type: LOAD_SUBSCRIPTIONS_SUCCESS,
    payload: channels
  };
}

export function loadTestResourceStart() {
  return {
    type: LOAD_TEST_RESOURCE_START
  };
}
export function loadTestResourceSuccess(message) {
  return {
    type: LOAD_TEST_RESOURCE_SUCCESS,
    payload: message
  }
}

export function loadProfileResourceStart() {
  return {
    type: LOAD_PROFILE_RESOURCE_START
  };
}
export function loadProfileResourceSuccess(profile) {
  return {
    type: LOAD_PROFILE_RESOURCE_SUCCESS,
    payload: profile
  }
}

export function updateProfileResourceStart() {
  return {
    type: UPDATE_PROFILE_RESOURCE_START
  };
}
export function updateProfileResourceSuccess(profile) {
  return {
    type: UPDATE_PROFILE_RESOURCE_SUCCESS,
    payload: profile
  }
}
