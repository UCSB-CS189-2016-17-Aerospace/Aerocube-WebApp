import React from 'react';
import { shallow, mount } from 'enzyme';

import LoadingScreen from '../index';

import { FormattedMessage } from 'react-intl';

const renderWrapper = (props={loading: true}, shallowRender=true) => {
  const loadingScreen = <LoadingScreen {...props} />;
  if(shallowRender) {
    return shallow(loadingScreen)
  } else {
    return mount(loadingScreen);
  }
};

describe('<LoadingScreen />', () => {
  it('has default state loading defined by the loading prop on initial render', () => {
    const wrapper = renderWrapper();
    expect(wrapper.state('loading')).toBeTruthy();
    const notLoadingWrapper = renderWrapper({loading: false});
    expect(notLoadingWrapper.state('loading')).not.toBeTruthy();
  });
});
