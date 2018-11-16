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

function* whiskeySaga() {
    yield takeLatest('FETCH_WHISKEY', fetchWhiskey);
}

export default whiskeySaga;