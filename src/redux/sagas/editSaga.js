import { put } from 'redux-saga/effects';
import axios from 'axios';



function* editSaga(action){
    console.log('action.payload.id', action.payload);
    try{
        yield axios.put(`/api/schedule/${action.payload.id}`, action.payload)
        yield put({type: 'FETCH_LIST'})
    }
    catch(error){
        console.log('error in editSaga', error);
    }
}

export default editSaga;