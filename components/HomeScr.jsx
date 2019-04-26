import React, { Component } from 'react';
import ColorChart from './color-chart';
import { connect } from 'react-redux';
import { getArt, getList, getByColor } from '../client/store/art';
import { map } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import Slider from './connectedSlider';
import ColorTree from './fd-colors';

class disconnectedFrame extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
    this.hangleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getArt();
  }

  handleChange(changeEvent) {
    this.setState({ keyword: changeEvent.target.value });
  }

  handleSubmit(submitEvent) {
    console.log(submitEvent);
    submitEvent.preventDefault();
    this.props.getList(this.state);
  }

  render() {
    console.log('PROPS!', this.props);
    if (!this.props.selected) {
      return '...loading';
    } else {
      return (
        <div className="allContent">
          <h1>Stijlize</h1>
          <div className="gallery">
            <ColorChart
              work={this.props.selected}
              select={this.props.getByColor}
            />
            <div className="caption">
              <h2>{this.props.selected.title}</h2>
              <h4>{this.props.selected.artist}</h4>
            </div>
          </div>
          <Slider list={this.props.list} getArt={this.props.getArt} />
          <input
            type="text"
            name="keyword"
            onChange={event => this.handleChange(event)}
            value={this.state.keyword}
          />
          <button type="submit" onClick={event => this.handleSubmit(event)}>
            Search
          </button>
        </div>
      );
    }
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
  };
};

export default connect(mapState, mapDispatch)(disconnectedFrame);
