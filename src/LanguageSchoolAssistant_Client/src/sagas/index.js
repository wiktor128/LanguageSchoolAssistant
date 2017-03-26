import { take, put, select, call } from 'redux-saga/effects';
import store from '../store';
import { 
  RESOURCE_SERVER_ADDRESS,
  LOAD_SUBSCRIPTIONS_START,
  LOAD_TEST_RESOURCE_START,
  LOAD_PROFILE_RESOURCE_START,
  UPDATE_PROFILE_RESOURCE_START,
  LOAD_USEFUL_LINKS_START,
  LOAD_USEFUL_LINKS_SUCCESS,
  UPDATE_USEFUL_LINKS_START,
  UPDATE_USEFUL_LINKS_SUCCESS,
} from '../constants';
import { 
  loadSubscriptionsSuccess,
  loadTestResourceSuccess,
  loadProfileResourceSuccess,
  updateProfileResourceSuccess,
  loadUsefulLinksStart,
  loadUsefulLinksSuccess,
  updateUsefulLinksStart,
  updateUsefulLinksSuccess
} from '../actions';
import apiRequest from '../utils/request';

export function* loadSubscriptionsSaga() {
  while (true) {
    yield take(LOAD_SUBSCRIPTIONS_START);

    console.log("loadSubscriptionsSaga");

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

    console.log("loadProfileResourceSaga");

    const userLoginName = store.getState().oidc.user.profile.name;

    var bodyParams = {
      loginName: userLoginName
    }

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/Get/';
    const result = yield call(apiRequest, url, 'POST', bodyParams);
    const resultData = result.data;

    console.log("load profile resoruce success: " + JSON.stringify(resultData));
    console.log("load profile resoruce store  : " + JSON.stringify(store.getState().profileResource.profile));

    yield put(loadProfileResourceSuccess(resultData));
  }
}

export function* updateProfileResourceSaga() {
  while (true) {
    yield take(UPDATE_PROFILE_RESOURCE_START);

    console.log("updateProfileResourceSaga");

    const profile = store.getState().profileResource.profile;

    console.log("update profile resoruce local: " + JSON.stringify(profile));
    console.log("update profile resoruce store  : " + JSON.stringify(store.getState().profileResource.profile));

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/Update/';
    const result = yield call(apiRequest, url, 'POST', profile); // simple put 'profile' as parameter - because it is json (not form data)
    const resultData = result.data;

    yield put(updateProfileResourceSuccess());
  }
}

export function* loadUsefulLinksSaga() {
  while (true) {
    yield take(LOAD_USEFUL_LINKS_START);

    console.log("loadUsefulLinksSaga");

    const userLoginName = store.getState().oidc.user.profile.name;

    var bodyParams = {
      loginName: userLoginName
    }

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/GetUsefulLinks/';
    const result = yield call(apiRequest, url, 'POST', bodyParams);
    const resultData = result.data;


    yield put(loadUsefulLinksSuccess(resultData));
  }
}

// export function* updateUsefulLinksSaga() {
//   while (true) {
//     yield take(LOAD_PROFILE_RESOURCE_START);

//     const userLoginName = store.getState().oidc.user.profile.name;

//     var bodyParams = {
//       loginName: userLoginName
//     }

//     const url = RESOURCE_SERVER_ADDRESS + '/Profile/Get/';
//     const result = yield call(apiRequest, url, 'POST', bodyParams);
//     const resultData = result.data;

//     yield put(loadProfileResourceSuccess(resultData));
//   }
// }

// export function* loadGroupDetailsSaga() {
//   while (true) {
//     yield take(LOAD_GROUP_DETAILS_START);

//     const profile = store.getState().profileResource.profile;

//     const url = RESOURCE_SERVER_ADDRESS + '/Profile/Update/';
//     const result = yield call(apiRequest, url, 'POST', profile); // simple put 'profile' as parameter - because it is json (not form data)
//     const resultData = result.data;

//     yield put(updateProfileResourceSuccess());
//   }
// }

export function* rootSaga() {
  yield [
    loadTestResourceSaga(),
    loadSubscriptionsSaga(),

    loadProfileResourceSaga(),
    updateProfileResourceSaga(),

    loadUsefulLinksSaga(),
    // updateUsefulLinksSaga()
  ]
}