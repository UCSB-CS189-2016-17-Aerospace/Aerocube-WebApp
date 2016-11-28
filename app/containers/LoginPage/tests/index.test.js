
import configureStore from '../../../store';
import expect from 'expect';
// import { shallow } from 'enzyme';
import LoginPage from '../index';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

const store = configureStore();

describe('<LoginPage />', () => {
  it('Both prop email and password are updated at submit click event', () => {
    // Render LoginPage component with email and password props
    const component = ReactTestUtils.renderIntoDocument(
      <LoginPage store={store} email={'yourfirenation@gmail.com'} password={'helloworld'} />
    );

    // Retrieve button from LoginPage Component
    const node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');

    // Trigger Click event
    ReactTestUtils.Simulate.click(node);
    expect(node.type).toBe('submit');
    expect(component.props.email).toEqual('yourfirenation@gmail.com');
    expect(component.props.password).toEqual('helloworld');
  });
});
