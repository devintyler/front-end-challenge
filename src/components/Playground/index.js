/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Nav from '../Nav';
import RepoContainer from '../RepoContainer';

// MUI theme
import theme from '../../Styles/_theme.js';

const Playground = () => {
	return (
		<MuiThemeProvider
			theme={theme}>
			<Nav></Nav>
			<RepoContainer></RepoContainer>
		</MuiThemeProvider>
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
)(Playground);
