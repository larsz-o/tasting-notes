import { combineReducers } from 'redux';

const reviewsReducer = (state = [], action) => {
    if (action.type === 'SET_USER_REVIEWS'){
        return action.payload;
    } return state; 
}
const whiskeyToReview = (state = {}, action) => {
    if (action.type === 'SET_WHISKEY_TO_REVIEW'){
        return action.payload;
    } return state; 
}
export default combineReducers({
    reviewsReducer, 
    whiskeyToReview
}); 