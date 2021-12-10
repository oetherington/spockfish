import React, { useState, useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { WebGLRenderer, Camera, Vector3, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MainBoard from './MainBoard';
import AttackBoard from './AttackBoard';
import PieceComponent from './Piece';
import Renderer from './Renderer';
import LegalMoves from './LegalMoves';
import Piece from '~/engine/Piece';
import Move from '~/engine/Move';
import Color, { colors } from '~/engine/Color';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import PlayerController from '~/controllers/players/PlayerController';
import SelectedPiece from '~/controllers/players/SelectedPiece';
import useSoundEffect from '~/hooks/useSoundEffect';

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

type BoardProps = {
	engine: RemoteEngine,
	position: SerializedPosition,
	setPosition: (position: SerializedPosition) => void,
	width: number,
	height: number,
	controllers: PlayerController[],
}

const Board = ({
	engine,
	position,
	setPosition,
	width,
	height,
	controllers,
}: BoardProps) => {
	const playMoveSound = useSoundEffect('move');

	const { gl, camera, setSize, raycaster, scene } = useThree();

	const [controls] = useState<OrbitControls>(makeControls(gl, camera));

	useFrame((state, delta) => controls.update());

	useEffect(() => {
		setSize(width, height);
	}, [width, height, setSize]);

	const [selected, setSelected] = useState<SelectedPiece | null>(null);

	const onMove = (newPosition: SerializedPosition) => {
		playMoveSound();
		setPosition(newPosition);
	};

	for (const controller of controllers)
		controller.onRender(
			engine,
			position,
			onMove,
			selected,
			setSelected,
			gl,
			scene,
			raycaster,
		);

	return (
		<Renderer outlinedRefs={selected ? [selected.obj] : []}>
			<MainBoard level={'W'} />
			<MainBoard level={'N'} />
			<MainBoard level={'B'} />
			<>
				{
					colors.map((color) =>
						position.attackBoards[color as Color].map((level) =>
							<AttackBoard key={level} {...{ color, level }} />
						)
					)
				}
			</>
			<>
				{
					position.pieces.map((piece: Piece, index: number) =>
						<PieceComponent key={index} {...piece} />
					)
				}
			</>
			<LegalMoves moves={selected ? selected.legalMoves : []} />
		</Renderer>
	);
};

export default Board;
