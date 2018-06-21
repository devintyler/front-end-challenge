// Use this file to create Immutable data models (if necessary)
import {Record} from 'immutable';

export const Org = new Record({
  orgName: '',
  orgRepos: [],
  loading: false,
  error: null,
});
