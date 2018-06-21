/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
// Uncomment next line to import actions
import * as actions from '../../actions';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Search from '../Search';

const Nav = (props) => {
	return (
		<AppBar
			color="primary"
			className="mainNav">
			<Search />
		</AppBar>
	);
};

// Use below functions to pass props + actions
const mapStateToProps = (/* state */) => ({});
const mapDispatchToProps = (/* dispatch */) => ({
	/* onChange: value => dispatch(actions.coolAction(value)), */
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Nav);
