import { put } from 'redux-saga/effects';
import axios from 'axios';


function* deleteGuestSaga(action) {
    console.log('action.payload', action.payload);
    try{
        yield axios.delete(`/api/guest_log/${action.payload}`)
        yield put({type:'FETCH_BOOK'})
    }
    catch(error){
        console.log('error in delete', error);
    }
}

export default deleteGuestSaga;