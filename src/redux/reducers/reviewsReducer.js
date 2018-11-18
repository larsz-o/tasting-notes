const reviewsReducer = (state = [], action) => {
    if (action.type === 'SET_USER_REVIEWS'){
        return action.payload;
    } return state; 
}

export default reviewsReducer; 