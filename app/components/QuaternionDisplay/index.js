/**
*
* QuaternionDisplay
*
*/

import React from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import 'three-orthographic-trackball-controls';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  & > canvas {
    width: 100%!important;
    height: 100%!important;
    flex-grow: 1;
  }
`;

class QuaternionDisplay extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.wrapperId = `three-wrapper-${Math.random()}`;
    this.wrapper = null;
  }

  webGLInit = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.wrapper = document.getElementById(this.wrapperId);
    let width = this.wrapper.getBoundingClientRect().width;
    let height = this.wrapper.getBoundingClientRect().height;
    this.camera = new THREE.PerspectiveCamera( 80, width/height, 0.1, 800 );
    this.camera.setFocalLength(29);
    this.camera.position.set(0, 0, 5);
    this.controls = new THREE.OrthographicTrackballControls(this.camera, this.wrapper);
    this.controls.addEventListener('change', this.webGLRender);
    this.renderer.setSize(width, height);
    this.scene.background = new THREE.Color(0xffffff);
    this.wrapper.appendChild(this.renderer.domElement);
    let meshMaterial = new THREE.MeshLambertMaterial( { color: 0xf9f9f9 } );
    let meshGeometry = new THREE.BoxGeometry(1, 1, 1);
    let box = new THREE.Mesh(meshGeometry, meshMaterial);
    box.setRotationFromQuaternion(this.props.quaternion);
    let light = new THREE.PointLight(0xf9f9f9, 3, 6, 2);
    light.position.set(-2, 2, 2);
    let backLight = new THREE.PointLight(0xf9f9f9, 2, 6, 2);
    backLight.position.set(2, -2, -2);
    let axisHelper = new THREE.AxisHelper(10);
    let gridXZ = new THREE.GridHelper(5, 5);
    gridXZ.position.set(0, 0, 0);
    this.scene.add(gridXZ);
    this.scene.add(box);
    this.scene.add(light);
    this.scene.add(backLight);
    this.scene.add(axisHelper);
  };

  webGLAnimate = () => {
    requestAnimationFrame( this.webGLAnimate );
    if(this.controls) {
      this.controls.update();
    }
  };

  webGLRender = () => {
    this.renderer.render(this.scene, this.camera);
  };

  webGLStart = () => {
    this.webGLInit();
    this.webGLAnimate();
    this.webGLRender();
  };

  webGLClear = () => {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    while(this.wrapper.lastChild) {
      this.wrapper.removeChild(this.wrapper.lastChild)
    }
  };

  webGLReset = () => {
    this.webGLClear();
    this.webGLStart();
  };

  componentDidMount() {
    this.webGLStart();
    window.addEventListener('resize', this.webGLReset);
  }

  componentDidUpdate() {
    this.webGLAnimate();
    this.webGLRender();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.webGLReset);
    this.webGLClear();
  }

  render() {
    return (
      <Wrapper id={this.wrapperId}>
      </Wrapper>
    )
  }
}

QuaternionDisplay.propTypes = {
  quaternion: React.PropTypes.instanceOf(THREE.Quaternion)
};

QuaternionDisplay.defaultProps = {
  quaternion: new THREE.Quaternion( -0.05984052433931416, 0.7461517576819129, -0.6480882557488663, -0.14020798449225447)
};

export default QuaternionDisplay;
