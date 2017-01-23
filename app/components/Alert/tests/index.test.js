import Alert from '../index';

import { mount, shallow } from 'enzyme';
import React from 'react';
import styled from 'styled-components';

let defaultHeader = 'This is a header';

let defaultMessage = 'This is a message';

let defaultShow = true;

let defaultType = Alert.getInfoAlertType();

let defaultProps = {
  header: defaultHeader,
  message: defaultMessage,
  show: defaultShow,
  type: defaultType
};

let buildDefaultAlert = () => {
  return (
    <Alert {...defaultProps} />
  )
};

describe('<Alert />', () => {

  /** Default Render **/
  it('Renders a div', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Renders a h2', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('Renders a p', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.find('p').length).toEqual(1);
  });

  it('Has the proper initial state', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.state(['show'])).toEqual(defaultShow);
  });

  /** Negative Default Render **/

  it('Does not render a button element props', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.find('button').length).toEqual(0);
  });

  /** Default Props **/

  it('Does not render a \'hide\' button', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.find('button').length).toEqual(0)
  });

  /** Props **/

  it('Correctly assigns classNames from props to the outer div', () => {
    let className = 'newClassName';
    const wrapper = mount(
      <Alert className={className}
             {...defaultProps}
      />
    );
    expect(wrapper.find('div').hasClass(className)).toEqual(true);
  });

  it('Correctly assigns classNames from props to the h2 header', () => {
    let headerClassName = 'testHeaderClassName';
    const wrapper = mount(
      <Alert headerClassName={headerClassName}
             {...defaultProps}
      />
    );
    expect(wrapper.find('h2').hasClass(headerClassName)).toEqual(true);
  });

  it('Correctly assigns classNames from props to the p element', () => {
    let messageClassName = 'testMessageClassName';
    const wrapper = mount(
      <Alert messageClassName={messageClassName}
             {...defaultProps}
      />
    );
    expect(wrapper.find('p').hasClass(messageClassName)).toEqual(true);
  });

  it('Correctly assigns classNames from props to the button element', () => {
    let buttonClassName = 'testButtonClassName';
    const wrapper = mount(
      <Alert buttonClassName={buttonClassName}
             showHideButton
             {...defaultProps}
      />
    );
    expect(wrapper.find('button').hasClass(buttonClassName)).toEqual(true);
  });

  it('Correctly hides the alert after a number of seconds defined with the hideAfter property', () => {
    const wrapper = mount(
      <Alert hideAfter={1}
             {...defaultProps}
      />
    );
    setTimeout(() => {
      expect(wrapper.mount().length).toEqual(0);
    }, 1200);
  });

  it('Renders a button if showHideButton prop is true', () => {
    const wrapper = mount(
      <Alert showHideButton
             {...defaultProps}
      />
    );
    expect(wrapper.find('button').length).toEqual(1);
  });

  /** State and Property Changes **/

  it('Updates the show state when any of the props change', () => {
    const wrapper = mount(buildDefaultAlert());
    expect(wrapper.setState({show: !defaultShow}).setProps({message: 'aNewMessage'}).state(['show'])).toEqual(defaultShow);
  });

  it('Properly handles hiding the alert', () => {
    const wrapper = mount(buildDefaultAlert());
    wrapper.instance().handleHide();
    setTimeout(() => {
      expect(wrapper.mount().length).toEqual(0);
    }, 200);
  });

  it('Properly handles hiding the alert after n seconds', () => {
    const wrapper = mount(buildDefaultAlert());
    wrapper.instance().handleHideAfter(1);
    setTimeout(() => {
      expect(wrapper.mount().length).toEqual(0);
    }, 1200);
  });

  it('Properly handles hiding the alert via the hide button', () => {
    const wrapper = mount(
      <Alert showHideButton
             {...defaultProps}
      />
    );
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(wrapper.mount().length).toEqual(0);
    }, 200);
  });

  /** Static alert classNames **/

  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual('infoAlert');
  });

  it('Correctly returns the errorAlert className', () => {
    expect(Alert.getErrorAlertType()).toEqual('errorAlert');
  });

  it('Correctly returns the warningAlert className', () => {
    expect(Alert.getWarningAlertType()).toEqual('warningAlert');
  });

  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual('infoAlert');
  });
});

