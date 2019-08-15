import { put } from 'redux-saga/effects';
import axios from 'axios';

// saga handles the delete for the guest log for the user. Sends the id of the item to the route to delete the individual log.
function* deleteGuestSaga(action) {
    // console.log('action.payload', action.payload);
    try{
        yield axios.delete(`/api/guest_log/${action.payload}`)
        yield put({type:'FETCH_BOOK'})
    }
    catch(error){
        console.log('error in delete', error);
    }
}

export default deleteGuestSaga;