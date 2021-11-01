import React, { useRef, useMemo, useEffect } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { Vector2, sRGBEncoding } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import {
	outlineColor,
	outlineStrength,
	outlineThickness,
} from './geometry';

extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass });

const Renderer = ({ outlinedRefs, children }) => {
	const { gl, scene, camera, size } = useThree();

	gl.outputEncoding = sRGBEncoding;
	gl.gammaFactor = 2.2;
	camera.fov = 75;

	const composer = useRef();

	const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

	useEffect(() => composer.current.setSize(size.width, size.height), [size]);

	useFrame(() => composer.current.render(), 1);

	return (
		<>
			{children}
			<effectComposer ref={composer} args={[gl]}>
				<renderPass
					attachArray='passes'
					args={[scene, camera]}
				/>
				<outlinePass
					attachArray='passes'
					args={[aspect, scene, camera]}
					selectedObjects={outlinedRefs}
					visibleEdgeColor={outlineColor}
					edgeStrength={outlineStrength}
					edgeThickness={outlineThickness}
				/>
				<shaderPass
					attachArray='passes'
					args={[FXAAShader]}
					uniforms-resolution-value={[
						1 / size.width,
						1 / size.height,
					]}
				/>
			</effectComposer>
		</>
	);
};

export default Renderer;
