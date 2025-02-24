import { put  } from 'redux-saga/effects';
import axios from 'axios';


// takes the guest log deom the guest-log and makes it available to the client side.
function* guestBookSaga () {
    try{
        const response = yield axios.get(`/api/guest_log`);
        // console.log('in fetchList', response);
        yield put({type: 'SET_GUESTBOOK', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in GETTing Dates', error)
    }
}


  
  export default guestBookSaga;