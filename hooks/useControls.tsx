import React, { useState } from 'react';
import { WebGLRenderer, Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const makeControls = (gl: WebGLRenderer, camera: Camera) => {
	const controls = new OrbitControls(camera, gl.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.1;
	controls.enablePan = false;
	controls.enableZoom = true;
	controls.zoomSpeed = 0.1;
	controls.rotateSpeed = 0.15;
	controls.minDistance = 2;
	controls.maxDistance = 14;
	controls.minPolarAngle = Math.PI * 0.1;
	controls.maxPolarAngle = Math.PI * 0.6;
	return controls;
};

const useControls = (gl: WebGLRenderer, camera: Camera) => {
	const [controls] = useState<OrbitControls>(makeControls(gl, camera));
	return controls;
};

export default useControls;
