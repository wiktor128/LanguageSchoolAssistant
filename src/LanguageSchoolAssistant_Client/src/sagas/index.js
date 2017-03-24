import { take, put, select, call } from 'redux-saga/effects';
import store from '../store';
import { 
  RESOURCE_SERVER_ADDRESS,
  LOAD_SUBSCRIPTIONS_START,
  LOAD_TEST_RESOURCE_START,
  LOAD_PROFILE_RESOURCE_START,
  UPDATE_PROFILE_RESOURCE_START
} from '../constants';
import { 
  loadSubscriptionsSuccess,
  loadTestResourceSuccess,
  loadProfileResourceSuccess,
  uploadProfileResourceSuccess
} from '../actions';
import apiRequest from '../utils/request';

export function* loadSubscriptionsSaga() {
  while (true) {
    yield take(LOAD_SUBSCRIPTIONS_START);

    const url = 'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true';
    const result = yield call(apiRequest, url);
    const channels = []

    for (const channel of result.data.items) {
      channels.push({
        id: channel.snippet.resourceId.channelId,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.default.url
      });
    }

    yield put(loadSubscriptionsSuccess(channels));
  }
}


export function* loadTestResourceSaga() {
  while (true) {
    yield take(LOAD_TEST_RESOURCE_START);

    const url = RESOURCE_SERVER_ADDRESS + '/Resource/Private';
    const result = yield call(apiRequest, url);
    const message = result.data;

    yield put(loadTestResourceSuccess(message));
  }
}

export function* loadProfileResourceSaga() {
  while (true) {
    yield take(LOAD_PROFILE_RESOURCE_START);

    const userLoginName = store.getState().oidc.user.profile.name;

    var bodyParams = {
      loginName: userLoginName
    }

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/Get/';
    const result = yield call(apiRequest, url, 'POST', bodyParams);
    const resultData = result.data;

    yield put(loadProfileResourceSuccess(resultData));
  }
}

export function* updateProfileResourceSaga() {
  while (true) {
    yield take(UPDATE_PROFILE_RESOURCE_START);

    const profile = store.getState().profileResource.profile;

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/Update/';
    const result = yield call(apiRequest, url, 'POST', profile); // simple put 'profile' as parameter - because it is json (not form data)
    const resultData = result.data;

  }
}

export function* rootSaga() {
  yield [
    loadTestResourceSaga(),
    loadSubscriptionsSaga(),

    loadProfileResourceSaga(),
    updateProfileResourceSaga()
  ]
}