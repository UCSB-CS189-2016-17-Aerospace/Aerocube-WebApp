import React from 'react';
import { mount, shallow } from 'enzyme';

import Img, { SpinnerWrapper, FadeInImg } from '../index';
import LoadingIndicator from '../../LoadingIndicator/index';

const src = 'test.png';
const alt = 'test';
const renderComponent = (props = {}, shouldMount=true) => {
  return shouldMount ? mount(
    <Img src={src} alt={alt} {...props} />
  ) : shallow(
    <Img src={src} alt={alt} {...props} />
  );
};

describe('<Img />', () => {
  describe('Before loading', () => {
    it('starts with state loaded: false', () => {
      const renderedComponent = renderComponent(undefined, false);
      expect(renderedComponent.state().loaded).toEqual(false);
    });

    it('should render an <LoadingIndicator />', () => {
      const renderedComponent = renderComponent();
      expect(renderedComponent.contains(<LoadingIndicator/>)).toBeTruthy();
    });

    it('should render a <SpinnerWrapper />', () => {
      const renderedComponent = renderComponent();
      expect(renderedComponent.find(SpinnerWrapper).length).toEqual(1);
    });

    it('should not render a <FadeInImg />', () => {
      const renderedComponent = renderComponent();
      expect(renderedComponent.find(FadeInImg).length).toEqual(0);
    });

    it('should pass a className attribute to the <SpinnerWrapper />', () => {
      let className = 'testClassName';
      let props = {
        spinnerWrapperClassName: className
      };
      const renderedComponent = renderComponent(props);
      expect(renderedComponent.find(SpinnerWrapper).props().className).toContain(className);
    });
  });

  describe('Once loaded', () => {
    it('should render a <FadeInImage />', () => {
      const renderedComponent = renderComponent();
      renderedComponent.setState({loaded: true});
      expect(renderedComponent.find(FadeInImg).length).toEqual(1);
    });

    it('should have an src attribute', () => {
      const renderedComponent = renderComponent();
      renderedComponent.setState({loaded: true});
      expect(renderedComponent.find('img').prop('src')).toEqual(src);
    });

    it('should have an alt attribute', () => {
      const renderedComponent = renderComponent();
      renderedComponent.setState({loaded: true});
      expect(renderedComponent.find('img').prop('alt')).toEqual(alt);
    });

    it('should adopt a className attribute', () => {
      const className = 'test';
      const renderedComponent = renderComponent({ className });
      renderedComponent.setState({loaded: true});
      expect(renderedComponent.find('img').hasClass(className)).toBe(true);
    });

    it('should not adopt a srcset attribute', () => {
      const srcset = 'test-HD.png 2x';
      const renderedComponent = renderComponent({ srcset });
      renderedComponent.setState({loaded: true});
      expect(renderedComponent.find('img').prop('srcset')).toBeUndefined();
    });
  });
});
