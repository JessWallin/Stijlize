import React, { Component } from 'react';
// import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
// import RBCarousel from 'react-bootstrap-carousel';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { current: true, active: 0 };
    this.setActive = this.setActive.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.list && this.props.list[0] !== prevProps.list[0]) {
      this.setState({ current: !this.state.current });
    }
  }

  setActive(id) {
    this.setState({ ...this.state, active: id });
  }

  toggleClass() {}

  render() {
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
