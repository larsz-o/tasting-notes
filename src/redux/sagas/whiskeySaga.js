import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* fetchWhiskey() {
    try {
        let whiskey = yield call(axios.get, '/api/whiskey');
        const response = { type: 'SET_WHISKEY', payload: whiskey.data };
        yield put(response);
    }
    catch (error) {
        console.log('Error getting whiskey', error);
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
function* whiskeySaga() {
    yield takeLatest('FETCH_WHISKEY', fetchWhiskey);
    yield takeLatest('SUBMIT_REVIEW', submitReview); 
}

export default whiskeySaga;