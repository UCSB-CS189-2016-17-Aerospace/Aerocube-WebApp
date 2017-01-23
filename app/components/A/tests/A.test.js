import A from '../index';

import { shallow, mount } from 'enzyme';
import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const children = (<div>Test</div>);

const renderComponent = (useShallow=true, props = {}, children=children) => {
  const component = (
    <A {...props}>
      { children }
    </A>
  );
  return useShallow ? shallow(component) : mount(component);
};

describe(<A/>, () => {
  it('renders a styled.a when targetRoute is not provided', () => {
    const shallowWrapper = renderComponent(false);
    expect(shallowWrapper.find('a')).toBeDefined();
  });

  it('passes props to <a>', () => {
    const props = {
      id: "id-test",
      href: "href-test",
      className: 'testClassName'
    };
    const shallowWrapper = renderComponent(false, props);
    const wrapperProps = shallowWrapper.find('a').props();
    expect(wrapperProps.id).toEqual(props.id);
    expect(wrapperProps.href).toEqual(props.href);
    expect(wrapperProps.className).toContain(props.className);
  });

  it('assimilates style props, does not pass them', () => {
    const props = {
      style: {color: 'blue'}
    };
    const shallowWrapper = renderComponent(false, props);
    const wrapperProps = shallowWrapper.find('a').props();
    expect(wrapperProps.style).toBeUndefined();
  });

  it('renders its children', () => {
    const children = [
      <h1>h1</h1>,
      <div>div</div>
    ];
    let wrapper = renderComponent(false, undefined, children);
    expect(wrapper.contains(children[0])).toBeTruthy();
    expect(wrapper.contains(children[1])).toBeTruthy();
  });

  it('handles clicks', () => {
    let onClickSpy = jest.fn();
    const props = {
      onClick: onClickSpy
    };
    let shallowWrapper = renderComponent(false, props);
    shallowWrapper.find('a').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
