import Alert from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import styles from '../styles.css';

let defaultHeader = 'This is a header';

let defaultMessage = 'This is a message';

let defaultShow = true;

let defaultType = Alert.getInfoAlertType();


let buildDefault = () => {
  return (
    <Alert header={defaultHeader}
           message={defaultMessage}
           show={defaultShow}
           type={defaultType}
    />
  )
};

describe('<Alert />', () => {
  /** Render **/
  it('Renders to a div at the outer level', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.type()).toEqual('div');
  });

  it('Renders a h2 as the first element inside the outer div', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.children().first().type()).toEqual('h2');
  });

  it('Renders a p as the last element inside the outer div', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.children().last().type()).toEqual('p');
  });

  /** Negative Render **/

  it('Renders only one h2 element', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('Renders only one p element', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.find('p').length).toEqual(1);
  });

  it('Does not render a button element', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.find('button').length).toEqual(0);
  });

  /** Default Props **/

  it('Has the proper alert className on the outer div', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.hasClass(styles.alert)).toEqual(true);
  });

  it('Has the proper alert type className on the outer div', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.hasClass(Alert.getInfoAlertType())).toEqual(true);
  });

  it('Does not the blockAlert className on the outer div', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.hasClass(styles.blockAlert)).toEqual(Alert.defaultProps.block);
  });

  it('Has the proper className on the header', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.find('h2').hasClass(styles.alertHeader)).toEqual(true);
  });

  it('Has the proper className on the message', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.find('p').hasClass(styles.alertMessage)).toEqual(true);
  });

  it('Does not render a \'hide\' button', () => {
    const wrapper = shallow(buildDefault());
    expect(wrapper.find('button').length).toEqual(0)
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
    expect(Alert.getWarningAlertType()).toEqual(styles.warningAlert);
  });

  it('Correctly returns the infoAlert className', () => {
    expect(Alert.getInfoAlertType()).toEqual(styles.infoAlert);
  });
});

