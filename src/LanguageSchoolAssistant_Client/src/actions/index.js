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
} from '../constants';

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

export function loadGroupDetailsStart() {
  return {
    type: LOAD_GROUP_DETAILS_START
  };
}
export function loadGroupDetailsSuccess(groupDetails) {
  return {
    type: LOAD_GROUP_DETAILS_SUCCESS,
    payload: groupDetails
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
