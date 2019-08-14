import { put } from 'redux-saga/effects';
import axios from 'axios';


// hanldes the delete payload and sends it to the datbase.
function* deleteSaga(action){
    console.log('action.payload.id', action.payload);
    try{
        yield axios.delete(`/api/schedule/${action.payload}`)
        yield put({type:'FETCH_LIST'})
    }
    catch(error){
        console.log('error in deleteSaga', error);
    }
}

export default deleteSaga;