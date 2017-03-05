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

const meterToCmConversion = (meters) => meters * 100;

const cube_x = meterToCmConversion(0.1);
const cube_y = meterToCmConversion(0.17025);
const cube_z = meterToCmConversion(0.1);

const camera_x = 0;
const camera_y = 15;
const camera_z = 40;

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

  addCube = (quaternion, x, y, z) => {
    let meshMaterial = new THREE.MeshLambertMaterial( { color: 0xf9f9f9 } );
    let meshGeometry = new THREE.CubeGeometry(cube_x, cube_y, cube_z, 1, 1, 1);
    let cube = new THREE.Mesh(meshGeometry, meshMaterial);
    cube.setRotationFromQuaternion(quaternion);
    // cube.position.set(meterToCmConversion(x) + camera_x, -1 * meterToCmConversion(y) + camera_y, -1 * meterToCmConversion(z) + camera_z);
    cube.position.set(meterToCmConversion(x), meterToCmConversion(y), meterToCmConversion(z));
    this.scene.add(cube);
  };

  webGLInit = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.wrapper = document.getElementById(this.wrapperId);
    let width = this.wrapper.getBoundingClientRect().width;
    let height = this.wrapper.getBoundingClientRect().height;
    this.camera = new THREE.PerspectiveCamera(80, width/height, 0.1, 2000);
    this.camera.setFocalLength(29);
    this.camera.position.set(camera_x, camera_y, camera_z);
    this.camera.lookAt(this.scene.position);
    this.controls = new THREE.OrthographicTrackballControls(this.camera, this.wrapper);
    this.controls.addEventListener('change', this.webGLRender);
    this.renderer.setSize(width, height);
    this.scene.background = new THREE.Color(0xffffff);
    this.wrapper.appendChild(this.renderer.domElement);
    let light = new THREE.PointLight(0xf9f9f9, 5, 500, 5);
    light.position.set(0, 250, 100);
    let frontLight = new THREE.PointLight(0xfafafa, 1, 500, 5);
    light.position.set(0, -250, 50);
    let ambientLight = new THREE.AmbientLight(0x111111);
    let axisHelper = new THREE.AxisHelper(100);
    let gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.position.set(0, 0, 0);
    this.scene.add(gridXZ);
    this.scene.add(light);
    this.scene.add(frontLight);
    this.scene.add(ambientLight);
    this.scene.add(axisHelper);
    this.addCubes();
  };

  addCubes = () => {
    this.props.cube_ids.forEach((cube_id) => {
      let tvec = this.props.tvecs[cube_id];
      let quaternionValues = this.props.quaternions[cube_id];
      let quaternion = new THREE.Quaternion(quaternionValues.x, quaternionValues.y, quaternionValues.z, quaternionValues.w);
      this.addCube(quaternion, tvec.x, tvec.y, tvec.z);
    });
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
    this.webGLReset();
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
  quaternions: React.PropTypes.objectOf(React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    z: React.PropTypes.number,
    w: React.PropTypes.number
  })),
  tvecs: React.PropTypes.objectOf(React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    z: React.PropTypes.number,
  })),
  cube_ids: React.PropTypes.arrayOf(React.PropTypes.number)
};

QuaternionDisplay.defaultProps = {
  quaternions: {},
  tvecs: {},
  cube_ids: []
};

export default QuaternionDisplay;
