import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Playground from '../Playground';

const Root = ({ store }) => (
	<Provider store={ store }>
		<div>
			<h1 className="repoTitle">Repo Scrape</h1>
			<Playground />
		</div>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired, // eslint-disable-line
};

export default Root;
