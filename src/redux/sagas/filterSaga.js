import { put  } from 'redux-saga/effects';
import axios from 'axios';



function* filterSaga (action) {
    try{
        const response = yield axios.get(`/api/schedule/change?filter=${action.payload}`);
        console.log('in fetchList', action.payload );
        yield put({type: 'SET_LIST', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in FilterSaga', error)
    }
}


  
  export default filterSaga;