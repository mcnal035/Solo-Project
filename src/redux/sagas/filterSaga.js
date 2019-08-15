import { put  } from 'redux-saga/effects';
import axios from 'axios';


// Filters through the dates to bring up the main months.
function* filterSaga (action) {
    try{
        const response = yield axios.get(`/api/schedule/change?month=${action.payload.month}&year=${action.payload.year}`);
        console.log('in fetchList', action.payload );
        yield put({type: 'SET_LIST', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in FilterSaga', error)
    }
}


  
  export default filterSaga;