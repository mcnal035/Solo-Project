// Main reducer for holding the date ranges and holds them as an array.
const getTrip = (state=[], action) => {
    // console.log('from', from);
    // console.log('getTrip state', state);
    // console.log('getTrip action.payload', action.payload)
    switch (action.type) {
       case 'SET_LIST':
            return action.payload;
        default:
            return state;
    }

}



export default getTrip;