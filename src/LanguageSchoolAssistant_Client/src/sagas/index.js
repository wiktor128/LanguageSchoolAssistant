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

  LOAD_GROUP_START,
  LOAD_GROUP_SUCCESS,
  LOAD_GROUPS_START,
  LOAD_GROUPS_SUCCESS,
  UPDATE_GROUP_START,
  UPDATE_GROUP_SUCCESS,
  DELETE_GROUP_START,

  LOAD_STUDENTS_START,
  LOAD_STUDENTS_SUCCESS,
  UPDATE_STUDENTS_GROUP_START,
  UPDATE_STUDENTS_GORUP_SUCCESS,

  LOAD_LANGUAGE_INSTRUCTORS_START,
  LOAD_LANGUAGE_INSTRUCTORS_SUCCESS,

  LOAD_CLASSES_START,
  LOAD_CLASSES_END,
  UPDATE_CLASSES_START,
  UPDATE_CLASSES_END,

  LOAD_RELATED_CLASSES_START,
  LOAD_RELATED_CLASSES_END,

  SHOW_SNACKBAR_MESSAGE,
} from '../constants';
import { 
  loadSubscriptionsSuccess,
  loadTestResourceSuccess,
  loadProfileResourceSuccess,
  updateProfileResourceSuccess,
  loadUsefulLinksStart,
  loadUsefulLinksSuccess,
  updateUsefulLinksStart,
  updateUsefulLinksSuccess,

  loadGroupStart,
  loadGroupSuccess,
  loadGroupsStart,
  loadGroupsSuccess,
  updateGroupStart,
  deleteGroupStart,

  loadStudentsStart,
  loadStudentsSuccess,
  updateStudentsGroupStart,

  loadLanguageInstructorsStart,
  loadLanguageInstructorsSuccess,

  loadClassesStart,
  loadClassesSuccess,
  updateClassesStart,

  loadRelatedClassesStart,
  loadRelatedClassesSuccess,

  showSnackbarMessage,
  hideSnackbarMessage
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

    yield put(loadProfileResourceSuccess(resultData));
  }
}
export function* updateProfileResourceSaga() {
  while (true) {
    yield take(UPDATE_PROFILE_RESOURCE_START);

    console.log("updateProfileResourceSaga");


    const profile = store.getState().profileResource.profile;

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
export function* updateUsefulLinksSaga() {
  while (true) {
    yield take(UPDATE_USEFUL_LINKS_START);

    console.log("updateUsefulLinksSaga");

    const usefulLink = store.getState().usefulLinks.newLink;

    console.log("useful Link: " + JSON.stringify(usefulLink));

    // var bodyParams = {
    //   usefulLink: usefulLink
    // }

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/AddUsefulLink/';
    const result = yield call(apiRequest, url, 'POST', usefulLink);
    const resultData = result.data;

    yield put(loadUsefulLinksSuccess(resultData));
  }
}

export function* updateGroupSaga() {
  while (true) {
    yield take(UPDATE_GROUP_START);

    console.log("updateGroupSaga");

    const group = store.getState().groupResource.temporaryGroup;

    console.log("temporary group to post: " + JSON.stringify(group));

    const url = RESOURCE_SERVER_ADDRESS + '/Management/UpdateGroup/';

    yield call(apiRequest, url, 'POST', group);

    yield put(loadGroupsStart());
  }
}
export function* deleteGroupSaga() {
  while (true) {
    yield take(DELETE_GROUP_START);

    console.log("deleteGroupSaga");

    const id = {id: store.getState().groupResource.temporaryGroup.studentsGroupId };

    console.log("temporary group ID to post: " + JSON.stringify(id));

    const url = RESOURCE_SERVER_ADDRESS + '/Management/DeleteGroup/';

    yield call(apiRequest, url, 'POST', id);

    yield put(loadGroupsStart());
  }
}

export function* loadGroupSaga() {
  while (true) {
    yield take(LOAD_GROUP_START);

    console.log("loadGroupSaga");

    const id = {id: store.getState().groupResource.temporaryGroup.studentsGroupId };

    console.log("temporary group ID to post: " + JSON.stringify(id));

    const url = RESOURCE_SERVER_ADDRESS + '/Management/GetGroup/';

    

    const result = yield call(apiRequest, url, 'POST', id);
    const resultData = result.data;

    yield put(loadGroupSuccess(resultData));
  }
}
export function* loadGroupsSaga() {
  while (true) {
    yield take(LOAD_GROUPS_START);

    console.log("loadGroupsSaga");

    const userLoginName = store.getState().groupResource.existingGroups;

    const url = RESOURCE_SERVER_ADDRESS + '/Management/GetAllGroups/';
    const result = yield call(apiRequest, url, 'POST');
    const resultData = result.data;

    console.log("result data: " + JSON.stringify(resultData));

    yield put(loadGroupsSuccess(resultData));
  }
}

export function* loadStudentsSaga() {
  while (true) {
    yield take(LOAD_STUDENTS_START);

    console.log("loadStudentsSaga");

    const url = RESOURCE_SERVER_ADDRESS + '/Management/GetAllStudents/';
    const result = yield call(apiRequest, url, 'POST');
    const resultData = result.data;

    console.log("result data: " + JSON.stringify(resultData));

    yield put(loadStudentsSuccess(resultData));
  }
}

export function* updateStudentsGroupSaga() {
  while (true) {
    yield take(UPDATE_STUDENTS_GROUP_START);

    console.log("updateStudentsGroupSaga");

    const students = store.getState().groupResource.temporaryStudentsToUpdateGroup;

    console.log("#####################################");
    console.log(JSON.stringify(students));
    console.log("#####################################");

    const url = RESOURCE_SERVER_ADDRESS + '/Management/UpdateStudentGroup/';

    for (var i = 0; i < students.length; i++) {
        const student = students[i];
        yield call(apiRequest, url, 'POST', student);
    }
    
    

    yield put(loadStudentsStart());
  }
}
export function* updateClassesSaga() {
  while (true) {
    yield take(UPDATE_CLASSES_START);

    console.log("updateClassesSaga");

    const classes = store.getState().classesResource.temporaryClasses;


    const url = RESOURCE_SERVER_ADDRESS + '/Management/UpdateClasses/';
    
    yield call(apiRequest, url, 'POST', classes);

    //yield put(loadClassesStart());
    console.log("before put");
    yield put(showSnackbarMessage("Classes updated successfully."));
  }
}

export function* loadRelatedClassesSaga() {
  while (true) {
    yield take(LOAD_RELATED_CLASSES_START);
    console.log("loadRelatedClassesSaga");

    // const profile = store.getState().profileResource.profile;
    const userLoginName = store.getState().oidc.user.profile.name;
    var bodyParams = {
      loginName: userLoginName
    }

    const url = RESOURCE_SERVER_ADDRESS + '/Profile/GetRelatedClasses/';
    const result = yield call(apiRequest, url, 'POST', bodyParams);
    const resultData = result.data;

    console.log("related classes: " + JSON.stringify(resultData));

    yield put(loadRelatedClassesSuccess(resultData));
  }
}


export function* rootSaga() {
  yield [
    loadTestResourceSaga(),
    loadSubscriptionsSaga(),

    loadProfileResourceSaga(),
    updateProfileResourceSaga(),

    loadUsefulLinksSaga(),
    updateUsefulLinksSaga(),

    loadStudentsSaga(),
    updateStudentsGroupSaga(),

    updateGroupSaga(),
    loadGroupSaga(),
    loadGroupsSaga(),
    deleteGroupSaga(),

    updateClassesSaga(),
    loadRelatedClassesSaga(),

    // snackbar()
  ]
}