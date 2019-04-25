import React, { Component } from 'react';
import ColorChart from './color-chart';
import { connect } from 'react-redux';
import { getArt, getList } from '../client/store/art';
import { map } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import ColorTree from './fd-colors';

const id = 27651;

class disconnectedFrame extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props.getArt());
    console.log(this.props.selected);
  }

  handleChange(changeEvent) {
    this.setState({ keyword: changeEvent.target.value });
  }

  handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    this.props.getList(this.state.keyword);
  }

  render() {
    console.log('PROPS!', this.props);
    if (!this.props.selected) {
      return '...loading';
    } else {
      return (
        <div className="allContent">
          <h1>Art + Data</h1>
          <div className="gallery">
            <ColorChart work={this.props.selected} />
            <div className="caption">
              <h2>{this.props.selected.title}</h2>
              <h4>{this.props.selected.artist}</h4>
            </div>
          </div>
          <input
            type="text"
            name="Keyword"
            value={this.state.value}
            onChange={this.handeChange}
            onSubmit={this.handleSubmit}
            placeholder="Search by keyword"
          />
          <button type="submit">Search</button>
        </div>
      );
    }
  }
}

const mapState = state => ({ selected: state.selected, list: state.list });

const mapDispatch = dispatch => {
  return {
    getArt: function() {
      dispatch(getArt(id));
    },
    getList: function(keyword = 'female') {
      dispatch(getArt(keyword));
    },
  };
};

export default connect(mapState, mapDispatch)(disconnectedFrame);
