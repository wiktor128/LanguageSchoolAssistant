import { 
  LOAD_SUBSCRIPTIONS_START, 
  LOAD_SUBSCRIPTIONS_SUCCESS,
  
  LOAD_TEST_RESOURCE_START,
  LOAD_TEST_RESOURCE_SUCCESS
} from '../constants';


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
