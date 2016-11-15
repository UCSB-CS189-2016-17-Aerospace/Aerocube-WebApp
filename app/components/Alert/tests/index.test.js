import Alert from '../index';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import styles from '../styles.css';

let buildDefault = () => {
  return <Alert header={'This is a header'} message={'This is a message'} show={true} type={Alert.getInfoAlertType()} />
};

describe('<Alert />', () => {
  it('Renders to a div at the outer level', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.type()).toEqual('div');
  });

  /** Props **/

  it('Correctly assigns classNames from props to the outer div', () => {
    let className = 'newClassName';
    const wrapper = shallow(
      <Alert header={'header'}
             message={'message'}
             show
             type={Alert.getInfoAlertType()}
             className={className}
      />
    );
    expect(wrapper.hasClass(className)).toEqual(true);
  });

  /** Static alert classNames **/
  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual(styles.infoAlert);
  });

  it('Correctly returns the errorAlert className', () => {
    expect(Alert.getErrorAlertType()).toEqual(styles.errorAlert);
  });

  it('Correctly returns the warningAlert className', () => {
    expect(Alert.getWarningAlertType()).toEqual(styles.errorAlert);
  });

  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual(styles.errorAlert);
  });
});

