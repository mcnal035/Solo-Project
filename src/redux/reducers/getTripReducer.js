const getTrip = (state=[], action) => {
    // console.log('state', state);
    // console.log('action.payload', action.payload);
    // console.log('action.type', action.type);
    // switch (action.payload === state[0]){
    // create an if statement to check if the new date added is already in exsistence.
    // }
    switch (action.type) {
    //    case (action.payload === state):
    //         return alert('time taken');
       case 'SET_LIST':
            return action.payload;
        default:
            return state;
    }
}



export default getTrip;