import Alert from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import styles from '../styles.css';

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

  it('Renders to a div at the outer level', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.type()).toEqual('div');
  });

  it('Renders a h2 as the first element inside the outer div', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.children().first().type()).toEqual('h2');
  });

  it('Renders a p as the last element inside the outer div', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.children().last().type()).toEqual('p');
  });

  it('Has the proper initial state', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.state(['show'])).toEqual(defaultShow);
  });

  /** Negative Default Render **/

  it('Renders only one h2 element', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('Renders only one p element', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.find('p').length).toEqual(1);
  });

  it('Does not render a button element props', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.find('button').length).toEqual(0);
  });

  /** Default Props **/

  it('Has the proper alert className on the outer div', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.hasClass(styles.alert)).toEqual(true);
  });

  it('Has the proper alert type className on the outer div', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.hasClass(Alert.getInfoAlertType())).toEqual(true);
  });

  it('Does not the blockAlert className on the outer div', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.hasClass(styles.blockAlert)).toEqual(Alert.defaultProps.block);
  });

  it('Has the proper className on the header', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.find('h2').hasClass(styles.alertHeader)).toEqual(true);
  });

  it('Has the proper className on the message', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.find('p').hasClass(styles.alertMessage)).toEqual(true);
  });

  it('Does not render a \'hide\' button', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.find('button').length).toEqual(0)
  });

  /** Props **/

  it('Correctly assigns classNames from props to the outer div', () => {
    let className = 'newClassName';
    const wrapper = shallow(
      <Alert className={className}
             {...defaultProps}
      />
    );
    expect(wrapper.hasClass(className)).toEqual(true);
  });

  it('Correctly assigns classNames from props to the h2 header', () => {
    let headerClassName = 'testHeaderClassName';
    const wrapper = shallow(
      <Alert headerClassName={headerClassName}
             {...defaultProps}
      />
    );
    expect(wrapper.find('h2').hasClass(headerClassName)).toEqual(true);
  });

  it('Correctly assigns classNames from props to the p element', () => {
    let messageClassName = 'testMessageClassName';
    const wrapper = shallow(
      <Alert messageClassName={messageClassName}
             {...defaultProps}
      />
    );
    expect(wrapper.find('p').hasClass(messageClassName)).toEqual(true);
  });

  it('Correctly assigns classNames from props to the button element', () => {
    let buttonClassName = 'testButtonClassName';
    const wrapper = shallow(
      <Alert buttonClassName={buttonClassName}
             showHideButton
             {...defaultProps}
      />
    );
    expect(wrapper.find('button').hasClass(buttonClassName)).toEqual(true);
  });

  it('Correctly assigns the blockAlert className to an Alert with the block property', () => {
    const wrapper = shallow(
      <Alert block
             {...defaultProps}
      />
    );
    expect(wrapper.hasClass(styles.blockAlert)).toEqual(true);
  });

  it('Correctly hides the alert after a number of seconds defined with the hideAfter property', () => {
    const wrapper = shallow(
      <Alert hideAfter={1}
             {...defaultProps}
      />
    );
    setTimeout(() => {
      expect(wrapper.shallow().length).toEqual(0);
    }, 1200);
  });

  it('Renders a button as the last element inside the outer div when the prop showButtonHide is True', () => {
    const wrapper = shallow(
      <Alert showHideButton
             {...defaultProps}
      />
    );
    expect(wrapper.children().last().type()).toEqual('button');
  });

  /** State and Property Changes **/

  it('Updates the show state when any of the props change', () => {
    const wrapper = shallow(buildDefaultAlert());
    expect(wrapper.setState({show: !defaultShow}).setProps({message: 'aNewMessage'}).state(['show'])).toEqual(defaultShow);
  });

  it('Properly handles hiding the alert', () => {
    const wrapper = shallow(buildDefaultAlert());
    wrapper.instance().handleHide();
    setTimeout(() => {
      expect(wrapper.shallow().length).toEqual(0);
    }, 200);
  });

  it('Properly handles hiding the alert after n seconds', () => {
    const wrapper = shallow(buildDefaultAlert());
    wrapper.instance().handleHideAfter(1);
    setTimeout(() => {
      expect(wrapper.shallow().length).toEqual(0);
    }, 1200);
  });

  it('Properly handles hiding the alert via the hide button', () => {
    const wrapper = shallow(
      <Alert showHideButton
             {...defaultProps}
      />
    );
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(wrapper.shallow().length).toEqual(0);
    }, 200);
  });

  /** Static alert classNames **/

  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual(styles.infoAlert);
  });

  it('Correctly returns the errorAlert className', () => {
    expect(Alert.getErrorAlertType()).toEqual(styles.errorAlert);
  });

  it('Correctly returns the warningAlert className', () => {
    expect(Alert.getWarningAlertType()).toEqual(styles.warningAlert);
  });

  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual(styles.infoAlert);
  });
});

