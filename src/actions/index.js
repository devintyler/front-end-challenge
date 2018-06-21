import * as types from '../constants';

const makeActionCreator = (type, ...argNames) => (...args) => {
	const action = { type };

	argNames.forEach((arg, index) => {
		action[argNames[index]] = args[index];
	});

	return action;
};

export const setOrg = (value) => ({
	type: types.SET_ORG,
	payload: value
});

export const fetchDataBegin = () => ({
	type: types.FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = data => ({
	type: types.FETCH_DATA_SUCCESS,
	payload: data,
});

export const fetchDataFail = error => ({
	type: types.FETCH_DATA_FAIL,
	payload: {error},
});

export function formatOrgName(org) {
	// remove spaces & lower-case conversion
	let formattedOrg = org
		.split(' ')
		.join('-')
		.toLowerCase();
	return dispatch => dispatch(setOrg(formattedOrg));
}

export function fetchData(url) {
	return dispatch => {
		dispatch(fetchDataBegin());
		return fetch(url)
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchDataSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchDataFail(error)));
	};
}

function handleErrors(res) {
	if (!res.ok) {
		throw Error(res.statusText);
	}
	return res;
}
