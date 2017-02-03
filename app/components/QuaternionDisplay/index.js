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
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = null;
    this.wrapperId = `three-wrapper-${Math.random()}`;
    this.controls = null;
    this.wrapper = null;
  }
  
  updateBoxSize = () => {
    this.wrapper = document.getElementById(this.wrapperId);
  };

  webGLInit = () => {
    let wrapper = document.getElementById(this.wrapperId);
    let width = wrapper.getBoundingClientRect().width;
    let height = wrapper.getBoundingClientRect().height;
    this.camera = new THREE.PerspectiveCamera( 80, width/height, 0.1, 800 );
    this.camera.setFocalLength(29);

    this.renderer.setSize(width, height);
    this.scene.background = new THREE.Color(0xffffff);
    wrapper.appendChild(this.renderer.domElement);

    let meshMaterial = new THREE.MeshLambertMaterial( { color: 0xf9f9f9 } );
    let meshGeometry = new THREE.BoxGeometry(1, 1, 1);
    let box = new THREE.Mesh(meshGeometry, meshMaterial);
    box.setRotationFromQuaternion(this.props.quaternion);
    let lineGeometry = new THREE.Geometry();
    let endVector = new THREE.Vector3(1, 1, 1);
    endVector.applyQuaternion(this.props.quaternion);
    lineGeometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      endVector
    );
    let lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
    let line = new THREE.Line( lineGeometry, lineMaterial );
    let light = new THREE.PointLight(0xf9f9f9, 3, 6, 2);
    light.position.set(-2, 2, 2);
    let backLight = new THREE.PointLight(0xf9f9f9, 2, 6, 2);
    backLight.position.set(2, -2, -2);
    let axisHelper = new THREE.AxisHelper(5);
    let gridXZ = new THREE.GridHelper(5, 5);
    gridXZ.position.set(0, 0, 0);
    this.scene.add(gridXZ);
    this.scene.add(box);
    this.scene.add(light);
    this.scene.add(backLight);
    this.scene.add(axisHelper);
    this.scene.add(line);
    this.camera.position.z = 3;
    this.controls = new THREE.OrthographicTrackballControls(this.camera, wrapper);
    this.controls.addEventListener('change', this.webGLRender);


  };

  webGLAnimate = () => {
    requestAnimationFrame( this.webGLAnimate );
    this.controls.update();
  };

  webGLRender = () => {
    this.renderer.render(this.scene, this.camera);
  };

  componentDidMount() {
    this.webGLInit();
    this.webGLAnimate();
    this.webGLRender();
  }

  componentDidUpdate() {
    this.webGLAnimate();
    this.webGLRender();
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
  quaternion: new THREE.Quaternion( .2, .2, .2, 1)
};

export default QuaternionDisplay;
