import { take, put, select, call } from 'redux-saga/effects';
import { 
  LOAD_SUBSCRIPTIONS_START,
  LOAD_TEST_RESOURCE_START
} from '../constants';
import { 
  loadSubscriptionsSuccess,
  loadTestResourceSuccess
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

    const url = 'https://localhost:44305/Resource/Private';

    const result = yield call(apiRequest, url);

    const message = result.data;

    yield put(loadTestResourceSuccess(message));
  }
}

export function* rootSaga() {
  yield [
    loadTestResourceSaga(),
    loadSubscriptionsSaga()
  ]
}