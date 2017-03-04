/**
*
* DashboardPanel
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import * as cssConstants from 'constants/cssConstants';
import * as cssQueries from 'constants/cssQueries';


const PanelWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  height: 100%;
  max-height: 50vh;
  box-shadow: ${cssConstants.lightShadow};
  border-radius: 2px;
  padding: ${props => props.padded ? '25px' : 0};
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
`;

const PanelHeader = styled.h1`
  font-weight: bold;
  color: ${cssConstants.colors.text};
`;

const PanelHeaderWrapper = styled.div`
  padding: ${props => props.padded ? '0 0 0 30px' : '0 0 0 10px'};
`;

class DashboardPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PanelWrapper size={this.props.size}
                    style={this.props.style}
                    padded={this.props.padded}>
        {
          this.props.title ? (
              <PanelHeaderWrapper padded={!this.props.padded}>
                { React.isValidElement(this.props.title) ? this.props.title : <PanelHeader>{this.props.title}</PanelHeader>}
              </PanelHeaderWrapper>
            ) : null
        }
        { this.props.children }
      </PanelWrapper>
    );
  }
}

DashboardPanel.sm = 'small';
DashboardPanel.lg = 'large';

DashboardPanel.propTypes = {
  size: React.PropTypes.oneOf([
    DashboardPanel.sm,
    DashboardPanel.lg
  ]),
  style: React.PropTypes.object,
  padded: React.PropTypes.bool,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node
  ])
};

DashboardPanel.defaultProps = {
  size: DashboardPanel.sm,
  padded: true
};

export default DashboardPanel;
