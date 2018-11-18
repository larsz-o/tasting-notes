import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* addWhiskey(action) {
    try {
      yield call(axios.post, '/api/whiskey/type', action.payload);
      let response = alert('Suggestion submitted! We will review your request in the next few days.');
      yield put(response); 
    }
    catch (error) {
        console.log('Error posting new whiskey type', error);
    }
}
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

function* whiskeySaga() {
    yield takeLatest('FETCH_WHISKEY', fetchWhiskey);
    yield takeLatest('ADD_WHISKEY_TYPE', addWhiskey)
}

export default whiskeySaga;