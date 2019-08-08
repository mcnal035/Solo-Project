const guestBookReducer = (state=[], action) => {
    console.log(state);
    switch (action.type) {
        case 'SET_BOOK':
            return action.payload;
        default:
            return state;
    }
}

export default guestBookReducer;