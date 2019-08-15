import { put  } from 'redux-saga/effects';
import axios from 'axios';

// sends the new guest log to the database and calls the get route to load the new log to the main page.
function* postList (action) {
    console.log('in post', action.payload);
    try {
      const response = yield axios.post('api/guest_log', action.payload );
      console.log(response.data);
      yield put({ type: 'FETCH_BOOK'});
    } catch (error) {
      console.log('error', error);
    }
  }

  export default postList;