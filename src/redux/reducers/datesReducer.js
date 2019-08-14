
const datesReducer = (state={}, action) => {
    console.log('datesReducer', state);
    switch (action.type) {
       case 'EDIT_DATES':
            return action.payload;
        default:
            return state;
    }

}

export default datesReducer;