import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import {takeEvery} from 'redux-saga/effects';
import fetchList from './fetchListSaga'
import postList from './postSaga'
import editSaga from './editSaga'
import deleteSaga from './deleteSaga';
import filterSaga from './filterSaga';
import guestBookSaga from './guestBookSaga';
import guestBookPostSaga from './guestBookPostSaga';
import deleteGuestSaga from './deleteGuestSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
// each Saga is called here in this generator function.
export default function* rootSaga() {
  yield takeEvery('FETCH_LIST', fetchList);
  yield takeEvery('ADD_DATE', postList);
  yield takeEvery('EDIT_ITEM', editSaga);
  yield takeEvery('DELETE_ITEM', deleteSaga);
  yield takeEvery('EDIT_MONTH', filterSaga);
  yield takeEvery('FETCH_BOOK', guestBookSaga);
  yield takeEvery('POST_LOG', guestBookPostSaga);
  yield takeEvery('DELETE_BOOK', deleteGuestSaga);
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    
  ]);
}
