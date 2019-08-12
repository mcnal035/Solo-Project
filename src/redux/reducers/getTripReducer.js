

let from = new Date()


const getTrip = (state=[], action) => {
    console.log('from', from);
    console.log('getTrip state', state);
    console.log('getTrip action.payload', action.payload);
    
    // switch (action.payload === state[0]){
    // create an if statement to check if the new date added is already in exsistence.
    // }
    // for (let i = 0; i < state.length; i++) {
    //     if(action.payload.start_date >= state[i].start_date && action.payload.start_date <= state[i].end_date){
    //         console.log('in loop found a conflict');
    //         return 'good';
    // }
        
    
    //     console.log('item in for in loop');
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