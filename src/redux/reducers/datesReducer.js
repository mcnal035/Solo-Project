

// holds current date that the user wants to edit and holds it.
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