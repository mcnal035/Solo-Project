import { put  } from 'redux-saga/effects';
import axios from 'axios';

// posts the new dates to the schedule api  
function* postList (action) {
    console.log('in post', action.payload);
    try {
      const response = yield axios.post('api/schedule', action.payload );
      console.log(response.data);
      yield put({ type: 'FETCH_LIST'});
    } catch (error) {
      alert('You must submit with dates')
      console.log('error', error);
    }
  }

  export default postList;