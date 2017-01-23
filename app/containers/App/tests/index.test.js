import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../index';
import LoadingScreen from 'components/LoadingScreen';

describe('<App />', () => {
  it('should not render children before auth status has been determined', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    );
    expect(renderedComponent.contains(children)).not.toBeTruthy();
  });

  it('should no longer render a <LoadingScreen /> once loading is complete', () => {

    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    );
    renderedComponent.setState({ loading: false });
    renderedComponent.update();
    expect(renderedComponent.contains(<LoadingScreen loading="false"/>)).not.toBeTruthy();
    expect(renderedComponent.contains(children)).toBeTruthy();
  });
});
