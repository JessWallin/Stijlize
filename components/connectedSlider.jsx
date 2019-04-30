import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';
// import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
// import RBCarousel from 'react-bootstrap-carousel';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      this.setState({ loading: this.props.loading });
    }
  }

  setAndLoad(id) {
    this.props.getArt(id);
    this.setState({ loading: true });
  }

  render() {
    return (
      <div className="sliderContainer">
        {this.props.loading ? (
          <div className="loader">
            <BarLoader sizeUnit={'px'} size={15} color={'#000'} />
          </div>
        ) : this.props.list.length > 0 ? (
          this.props.list.map(image => {
            return (
              <div className="sliderImageContainer" key={image.id}>
                <img
                  className={
                    this.props.selected === image.id
                      ? 'sliderImageSelected'
                      : 'sliderImage'
                  }
                  src={image.imageUrl}
                  onClick={() => this.setAndLoad(image.id)}
                />
              </div>
            );
          })
        ) : (
          <p>No images found. </p>
        )}
      </div>
    );
  }
}

export default Slider;
