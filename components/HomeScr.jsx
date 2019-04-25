import React, { Component } from 'react';
import ColorChart from './color-chart';

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: 'Red Boats, Argenteuil',
        artist: 'l.l. Claude Monet 75',
        colors: [
          {
            percent: 0.33357357357357,
            spectrum: '#7b65ad',
            color: '#96afaf',
            css3: '#a9a9a9',
            hue: 'Blue',
          },
          {
            percent: 0.27063063063063,
            spectrum: '#6c6ab0',
            color: '#647d7d',
            css3: '#708090',
            hue: 'Blue',
          },
          {
            percent: 0.20228228228228,
            spectrum: '#7069af',
            color: '#7d9696',
            css3: '#778899',
            hue: 'Green',
          },
          {
            percent: 0.11255255255255,
            spectrum: '#536fb5',
            color: '#4b647d',
            css3: '#696969',
            hue: 'Blue',
          },
          {
            percent: 0.03033033033033,
            spectrum: '#8761aa',
            color: '#afc8c8',
            css3: '#c0c0c0',
            hue: 'Green',
          },
          {
            percent: 0.027027027027027,
            spectrum: '#59ba4a',
            color: '#64644b',
            css3: '#696969',
            hue: 'Green',
          },
          {
            percent: 0.016156156156156,
            spectrum: '#2eb45d',
            color: '#324b4b',
            css3: '#2f4f4f',
            hue: 'Grey',
          },
          {
            percent: 0.0032432432432432,
            spectrum: '#e9715f',
            color: '#af6432',
            css3: '#a0522d',
            hue: 'Orange',
          },
          {
            percent: 0.0030630630630631,
            spectrum: '#8761aa',
            color: '#c8e1e1',
            css3: '#dcdcdc',
            hue: 'Green',
          },
          {
            percent: 0.0011411411411411,
            spectrum: '#e9715f',
            color: '#af7d4b',
            css3: '#cd853f',
            hue: 'Yellow',
          },
        ],
      },
    };
  }
  render() {
    return (
      <div className="allContent">
        <h1>Title</h1>
        <ColorChart colors={this.state.data.colors} />
        <h2>{this.state.data.title}</h2>
        <h4>{this.state.data.artist}</h4>
      </div>
    );
  }
}

export default Frame;
