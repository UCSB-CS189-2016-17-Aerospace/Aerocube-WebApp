/**
 *
 * Img.react.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import LoadingIndicator from '../LoadingIndicator';

import * as css from '../../constants/cssConstants';

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

export const FadeInImg = styled.img`
  display: inline-flex;
  flex-grow: 1;
  flex-shrink: 0;
  animation: ${css.animations.fadeIn};
  max-width: 100%;
`;

class Img extends React.PureComponent {
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
    let inner = null;

    if(!self.state.loaded) {
      inner = (
        <SpinnerWrapper className={self.props.spinnerWrapperClassName}
                        style={self.props.spinnerWrapperStyle}>
          <LoadingIndicator />
        </SpinnerWrapper>
      )
    } else {
      inner = (
        <FadeInImg className={self.props.className}
                   style={self.props.style}
                   src={self.props.src}
                   alt={self.props.alt}
                   ref={(input) => { self.img = input }} />
      );
    }

    if(self.props.lazyLoad) {
      output = (
        <LazyLoad offset={self.props.lazyLoadOffset}
                  height={self.props.lazyLoadHeight}
                  once={self.props.lazyLoadOnce}
                  placeholder={self.props.lazyLoadPlaceholder}>
          { inner }
        </LazyLoad>
      )
    } else {
      output = inner;
    }
    return output;
  }
}

Img.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  lazyLoad: React.PropTypes.bool,
  lazyLoadOffset: React.PropTypes.number,
  lazyLoadPlaceholder: React.PropTypes.node,
  lazyLoadHeight: React.PropTypes.number,
  lazyLoadOnce: React.PropTypes.bool,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  spinnerWrapperStyle: React.PropTypes.object,
  spinnerWrapperClassName: React.PropTypes.string,
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
  spinnerWrapperClassName: ''
};

export default Img;
