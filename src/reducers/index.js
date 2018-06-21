import { combineReducers } from 'redux';
import * as types from '../constants';
import {
	Org,
} from '../models';

const initialState = new Org();

const org = (state = initialState, {
	type,
	payload
}) => {
	switch (type) {
		case types.SET_ORG:
			return Object.assign({}, state, {
				orgName: payload
			});
		case types.FETCH_DATA_BEGIN:
			return Object.assign({}, state, {
				loading: true,
				error: null,
			});
		case types.FETCH_DATA_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				orgRepos: payload,
			});
		case types.FETCH_DATA_FAIL:
			return Object.assign({}, state, {
				loading: false,
				error: payload,
				orgRepos: [],
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	org,
});

export default rootReducer;
