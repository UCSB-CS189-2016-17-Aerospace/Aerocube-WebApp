/**
 * Testing our Button component
 */

import React from 'react';
import { mount } from 'enzyme';

import Button from '../index';

const targetRoute = '/';
const href = 'https://google.com';
const children = (<h1>Test</h1>);
const renderComponent = (props = {}) => mount(
  <Button href={href} {...props}>
    {children}
  </Button>
);

describe('<Button />', () => {

  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const renderedComponent = renderComponent({ onClick: onClickSpy });
    renderedComponent.find('a').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should render a <button> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('button').length).toEqual(1);
  });

  it('rendered <a/> tag should not adopt a type property', () => {
    const type = 'text/html';
    const renderedComponent = renderComponent({ href, type });
    expect(renderedComponent.find('a').prop('type')).toBeUndefined();
  });

  it('rendered <button /> should adopt a type property', () => {
    const type = 'submit';
    const renderedComponent = renderComponent({ targetRoute, type });
    expect(renderedComponent.find('button').prop('type')).toEqual(type);
  });

  it('rendered <button /> should have a default type property of \'button\'', () => {
    const renderedComponent = renderComponent({ targetRoute });
    expect(renderedComponent.find('button').prop('type')).toEqual('button');
  });
});
