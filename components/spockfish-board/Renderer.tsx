/*
 * This file is part of Spockfish
 * Copyright (C) 2021-2022 Ollie Etherington <www.etherington.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useRef, useMemo, useEffect } from 'react';
import {
	ReactThreeFiber,
	useThree,
	useFrame,
	extend,
} from '@react-three/fiber';
import {
	Vector2,
	sRGBEncoding,
	PerspectiveCamera,
	Color,
	Group,
} from 'three';
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

declare global {
	namespace JSX {
		interface IntrinsicElements {
			effectComposer: ReactThreeFiber.Object3DNode<
				EffectComposer, typeof EffectComposer>;
			renderPass: ReactThreeFiber.Object3DNode<
				RenderPass, typeof RenderPass>;
			outlinePass: ReactThreeFiber.Object3DNode<
				OutlinePass, typeof OutlinePass>;
			shaderPass: ReactThreeFiber.Object3DNode<
				ShaderPass, typeof ShaderPass>;
		}
	}
}

type RendererProps = {
	outlinedRefs: Group[];
	children: JSX.Element[] | JSX.Element;
}

const Renderer = ({ outlinedRefs, children }: RendererProps) => {
	const { gl, scene, camera, size } = useThree();

	gl.outputEncoding = sRGBEncoding;
	gl.gammaFactor = 2.2;
	(camera as PerspectiveCamera).fov = 75;

	const composer = useRef<EffectComposer | undefined>();

	const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

	useEffect(() => {
		if (composer.current)
			composer.current.setSize(size.width, size.height);
	}, [size]);

	useFrame(() => {
		if (composer.current)
			composer.current.render();
	}, 1);

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
					visibleEdgeColor={new Color(outlineColor)}
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
