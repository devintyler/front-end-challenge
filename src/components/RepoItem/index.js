/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import {Star} from '@material-ui/icons';
import {grey} from '@material-ui/core/colors';

class RepoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contributors: [],
    }

    this.timeSince = this.timeSince.bind(this);
    this.generateColor = this.generateColor.bind(this);
    this.getContributors = this.getContributors.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  componentDidMount() {
    this.getContributors(this.props.repo.contributors_url);
  }

  timeSince (date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  generateColor() {
    const colorArray = [grey['50'], grey['200'], grey['300']];
    let styles = {
      backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)],
    }
    return styles;
  }

  getContributors(url) {
		return fetch(url)
			.then(this.handleErrors)
			.then(res => res.json())
			.then(json => {
        this.setState({
          contributors: json
        });
			})
			.catch(error => {return error});
  }

  handleErrors(res) {
  	if (!res.ok) {
  		throw Error(res.statusText);
  	}
  	return res;
  }

  handleClick(url) {
    window.open(url);
    return;
  }

  render() {
    let repo = this.props.repo;
    let dateOfUpdate = new Date(repo.updated_at);
    let repoDate = this.timeSince(dateOfUpdate.getTime());
    let bgColor = this.generateColor();

    return (
      <div
        className="repoItem"
        key={repo.id}
        style={bgColor}>
        <div className="repoItemTop">
          <div className="repoItemTop__name">
            <a href={repo.html_url} target="_blank" rel="noopener">
              {repo.name}
            </a>
          </div>
          <div className="repoItemTop__lastUpdated">
            Last Updated: {repoDate} ago
          </div>
        </div>
        <div className="repoItem__contributorTitle">Who helped out?</div>
        <div className="repoItem__contributors">
          {this.state.contributors.map((person, index, arr) => {
            return (
              <Chip
                key={person.id}
                label={person.login}
                onClick={() => this.handleClick(person.html_url)}
                className="repoItem__contributor"
              />
            )
          })}
        </div>
        <div className="repoItemBottom">
          <div className="repoItemBottom__forkCount">
            Forks: {repo.forks}
          </div>
          <div className="repoItemBottom__starCount">
            <Star></Star> {repo.stargazers_count}
          </div>
        </div>
      </div>
    )
  }
}

RepoItem.propTypes = {
	repos: PropTypes.array.isRequired, // eslint-disable-line
  error: PropTypes.object, // eslint-disable-line
};

// Use below functions to pass props + actions
const mapStateToProps = state => ({
  repos: state.org.orgRepos,
  error: state.org.error,
});
const mapDispatchToProps = (dispatch) => ({
	/* onChange: value => dispatch(actions.coolAction(value)), */
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RepoItem);
