import React from 'react';
import { shallow, mount } from 'enzyme';

import LogOutput from '../index';

describe('<LogOutput />', () => {
  it('Is wrapped in a section', () => {
    const wrapper = mount(<LogOutput/>);
    expect(wrapper.find('section').length).toEqual(1);
  });
  it('Prints lines passed as props', () => {
    const lines = ['line1', 'line2'];
    const wrapper = mount(<LogOutput/>);
    expect(wrapper.findWhere(n => n.text() == lines[0]));
    expect(wrapper.findWhere(n => n.text() == lines[1]));
  });
});
