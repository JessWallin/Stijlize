import React, { Component } from 'react';
import ColorChart from './color-chart';
import { connect } from 'react-redux';
import { getArt } from '../client/store/art';
import { map } from '@amcharts/amcharts4/.internal/core/utils/Iterator';

class disconnectedFrame extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    console.log(this.props.getArt());
    console.log(this.props.selected);
  }

  render() {
    console.log(this.props.selected);
    return (
      <div className="allContent">
        <h1>Art + Data</h1>
        <ColorChart work={this.props.selected} />
        <h2>{this.props.selected.title}</h2>
        <h4>{this.props.selected.artist}</h4>
      </div>
    );
  }
}

const mapState = state => ({ selected: state });

const mapDispatch = dispatch => {
  return {
    getArt: function() {
      dispatch(getArt());
    },
  };
};

export default connect(mapState, mapDispatch)(disconnectedFrame);
