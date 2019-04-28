/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import ColorChart from './color-chart';
import { connect } from 'react-redux';
import {
  getArt,
  getList,
  getByColor,
  getByArtist,
  getByDate,
} from '../client/store/art';
import Slider from './connectedSlider';
import InfoPop from './infopop';
import About from './about';
import SearchBar from './search';

class disconnectedFrame extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '', popUp: false, about: false };
    this.hangleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
  }
  componentDidMount() {
    this.props.getArt();
  }

  handleChange(changeEvent) {
    this.setState({ ...this.state, keyword: changeEvent.target.value });
  }

  handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    this.props.getList(this.state);
    this.setState({ ...this.state, keyword: '' });
  }

  togglePopup() {
    this.setState({
      ...this.state,
      popUp: !this.state.popUp,
    });
  }

  toggleAbout() {
    this.setState({
      ...this.state,
      about: !this.state.about,
    });
  }

  render() {
    return (
      <div className="allContent">
        <h1 onClick={this.toggleAbout}>Stijlize</h1>
        <div className="gallery">
          {!this.props.selected.title ? (
            <div className="loading">...loading</div>
          ) : null}
          {!this.state.about ? (
            <ColorChart
              work={this.props.selected}
              select={this.props.getByColor}
            />
          ) : (
            <About close={this.toggleAbout} />
          )}
          {this.state.popUp ? (
            <InfoPop
              url={this.props.selected.url}
              title={this.props.selected.title}
              description={this.props.selected.description}
              close={this.togglePopup}
            />
          ) : null}
          <div className="caption">
            <h2 id="title" onClick={this.togglePopup}>
              {this.props.selected.title}
            </h2>
            <h4
              id="artist"
              onClick={() =>
                this.props.getByArtist(this.props.selected.artistId)
              }
            >
              {this.props.selected.artist}
            </h4>
            <h4
              id="year"
              onClick={() => this.props.getByDate(this.props.selected.year)}
            >
              {this.props.selected.date}
            </h4>
          </div>
        </div>
        {this.props.list.length > 0 ? (
          <Slider list={this.props.list} getArt={this.props.getArt} />
        ) : // <p id="error">No results</p>
        null}
        {/* <SearchBar
            handleChange={this.handleChange}
            keyword={this.state.keyword}
            handleSubmit={this.handleSubmit}
          /> */}
        <div className="search">
          <input
            type="text"
            name="keyword"
            onChange={event => this.handleChange(event)}
            value={this.state.keyword}
            placeholder="Search by keyword"
          />
          <button type="submit" onClick={event => this.handleSubmit(event)}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  selected: state.selected,
  list: state.currentList,
});

const mapDispatch = dispatch => {
  return {
    getArt: function(id) {
      dispatch(getArt(id));
    },
    getList: function(keyword) {
      dispatch(getList(keyword));
    },
    getByColor: function(color) {
      dispatch(getByColor(color));
    },
    getByArtist: function(artist) {
      dispatch(getByArtist(artist));
    },
    getByDate: function(date) {
      dispatch(getByDate(date));
    },
  };
};

export default connect(mapState, mapDispatch)(disconnectedFrame);
