/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Uncomment next line to import actions
import * as actions from '../../actions';
import Typography from '@material-ui/core/Typography';
import RepoItem from '../RepoItem';

class RepoContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { error, loading, repos, name } = this.props;
    console.log(error);

    if (error) {
      return (
        <div className="error__container">
          <h3 className="error__title">There was an error!</h3>
          <p className="error__message">Error message: {error.error.message}</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="loadingContainer">
        </div>
      );
    }

    if (repos) {
      return (
    		<div
          className="repoContainer">
          {repos.map(repo =>
            <RepoItem
              key={repo.id}
              repo={repo} />
          )}
        </div>
    	);
    }

    return (<div></div>);
  }
}

RepoContainer.propTypes = {
	name: PropTypes.string.isRequired, // eslint-disable-line
  loading: PropTypes.bool, // eslint-disable-line
  repos: PropTypes.array, // eslint-disable-line
  error: PropTypes.object, // eslint-disable-line
};

// Use below functions to pass props + actions
const mapStateToProps = state => ({
  name: state.org.orgName,
  loading: state.org.loading,
  repos: state.org.orgRepos,
  error: state.org.error,
});
const mapDispatchToProps = (dispatch) => ({
	/* onChange: value => dispatch(actions.coolAction(value)), */
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RepoContainer);
