const guestBookReducer = (state=[], action) => {
    // console.log(state);
    switch (action.type) {
        case 'SET_GUESTBOOK':
            return action.payload;
        default:
            return state;
    }
}

export default guestBookReducer;