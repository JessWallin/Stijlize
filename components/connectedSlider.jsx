import React, { Component } from 'react';
// import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
// import RBCarousel from 'react-bootstrap-carousel';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { current: true };
  }

  componentDidUpdate(prevProps) {
    if (this.props.list && this.props.list[0] !== prevProps.list[0]) {
      this.setState({ current: !this.state.current });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="sliderContainer">
        {this.props.list
          ? this.props.list.map(image => {
              return (
                <div className="sliderImageContainer" key={image.id}>
                  <img
                    className="sliderImage"
                    src={image.imageUrl}
                    onClick={() => this.props.getArt(image.id)}
                  />
                </div>
              );
            })
          : 'list'}
      </div>
    );
  }
}

export default Slider;
