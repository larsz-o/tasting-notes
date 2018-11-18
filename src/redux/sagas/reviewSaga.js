import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* fetchReviews(){
    try{
        let reviews = yield call(axios.get, '/api/whiskey/reviews');
        yield put({type: 'SET_USER_REVIEWS', payload: reviews.data});
    } 
    catch (error) {
        console.log('Error getting user reviews', error);
    }
}
function* submitReview(action){
    try{
        yield call(axios.post, '/api/whiskey', action.payload);
        yield put({type: 'FETCH_REVIEWS'}); 
    }
    catch (error) {
        console.log('Error posting review', error);
    }
}
function* reviewSaga() {
    yield takeLatest('FETCH_USER_REVIEWS', fetchReviews);
    yield takeLatest('SUBMIT_REVIEW', submitReview); 
}

export default reviewSaga;