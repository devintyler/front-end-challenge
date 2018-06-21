/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const orgName = "https://api.github.com/orgs/"+this.props.orgName+"/repos";
    this.props.handleSubmit(orgName);
  }

  render() {
    return (
      <Toolbar>
        <form
          onSubmit={this.handleSubmit}
          className="mainNav__container">
          <Input
            placeholder="Search for your orgs repos"
            className="search"
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary">
            Search
          </Button>
        </form>
      </Toolbar>
    )
  }
}

Search.propTypes = {
	orgName: PropTypes.string.isRequired, // eslint-disable-line
};

// Use below functions to pass props + actions
const mapStateToProps = state => {
  return {
    orgName: state.org.orgName,
  };
};
const mapDispatchToProps = (dispatch) => ({
	/* onChange: value => dispatch(actions.coolAction(value)), */
	handleChange: value => dispatch(actions.formatOrgName(value)),
  handleSubmit: value => dispatch(actions.fetchData(value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Search);
