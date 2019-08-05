const getTrip = (state=[], action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'SET_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default getTrip;