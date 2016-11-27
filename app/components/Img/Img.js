/**
*
* Img
*
*/

import React from 'react';
import LazyLoad from 'react-lazyload';
import { CircularProgress } from 'material-ui';

require('./styles.css');

class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.img = undefined;
  }

  componentWillMount() {
    this.loadImage(this.props.src);
  }

  loadImage = (src) => {
    if(!this.state.loaded) {
      let image = new Image();
      image.src = src;
      image.onload = () => {
        this.setState({
          loaded: true
        });
      }
    }
  };

  render() {
    let self = this;
    let output = null;

    if(!self.state.loaded) {
      output = (
        <div className={`img-spinnerWrapper ${self.props.spinnerWrapperClassName}`}
             style={self.props.spinnerWrapperStyle}>
          <CircularProgress style={self.props.spinnerStyle} />
        </div>
      )
    } else {
      output = (
        <img className={`img ${self.props.className}`}
             style={self.props.style}
             src={self.props.src}
             ref={(input) => { self.img = input }} />
      );
    }

    if(self.props.lazyLoad) {
      output = (
        <LazyLoad offset={self.props.lazyLoadOffset}
                  height={self.props.lazyLoadHeight}
                  once={self.props.lazyLoadOnce}
                  placeholder={self.props.lazyLoadPlaceholder}>
          { output }
        </LazyLoad>
      )
    }
    return output;
  }
}

Img.propTypes = {
  src: React.PropTypes.string.isRequired,
  lazyLoad: React.PropTypes.bool,
  lazyLoadOffset: React.PropTypes.number,
  lazyLoadPlaceholder: React.PropTypes.node,
  lazyLoadHeight: React.PropTypes.number,
  lazyLoadOnce: React.PropTypes.bool,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  spinnerWrapperStyle: React.PropTypes.object,
  spinnerWrapperClassName: React.PropTypes.string,
  spinnerStyle: React.PropTypes.object
};

Img.defaultProps = {
  lazyLoad: false,
  lazyLoadOffset: 0,
  lazyLoadPlaceholder: null,
  lazyLoadHeight: 0,
  lazyLoadOnce: true,
  style: {},
  className: '',
  spinnerWrapperStyle: {},
  spinnerWrapperClassName: '',
  spinnerStyle: {}
};

export default Img;
