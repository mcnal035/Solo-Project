import { put  } from 'redux-saga/effects';
import axios from 'axios';

// GETs all the main dates for the calendar and sends them to the DOM.

function* fetchList () {
    try{
        const response = yield axios.get(`/api/schedule`);
        console.log('in fetchList', response);
        yield put({type: 'SET_LIST', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in GETTing Dates', error)
    }
}


  
  export default fetchList;