import React, { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { WebGLRenderer, Camera, Vector3, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useDomEvent from '~/hooks/useDomEvent';
import MainBoard from './MainBoard';
import AttackBoard from './AttackBoard';
import PieceComponent from './Piece';
import Renderer from './Renderer';
import LegalMoves from './LegalMoves';
import Piece from '~/engine/Piece';
import Move from '~/engine/Move';
import Color, { colors } from '~/engine/Color';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';

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

type SelectedPiece = {
	obj: Group;
	piece: Piece;
	legalMoves: Move[];
}

type BoardProps = {
	engine: RemoteEngine,
	position: SerializedPosition,
	width: number,
	height: number,
}

const Board = ({ engine, position, width, height }: BoardProps) => {
	const { gl, camera, setSize, raycaster, scene } = useThree();

	const [controls] = useState<OrbitControls>(makeControls(gl, camera));

	useFrame((state, delta) => controls.update());

	useEffect(() => {
		setSize(width, height);
	}, [width, height, setSize]);

	const [selected, setSelected] = useState<SelectedPiece | null>(null);

	const selectPiece = async (obj: Group) => {
		if (!obj || (selected && obj === selected.obj)) {
			setSelected(null);
		} else {
			const piece = obj.userData as Piece;
			const legalMoves = await engine.getLegalMovesForPiece(piece);
			setSelected({ obj, piece, legalMoves });
		}
	};

	const clickObject = (obj: Group) => {
		if (obj.userData.piece || obj.userData.abLevel) {
			selectPiece(obj);
		} else if (obj.userData.square) {
			setSelected(null);
		}
	};

	useDomEvent(gl.domElement, 'click', () => {
		const objects = raycaster.intersectObjects(scene.children);
		if (objects.length > 0) {
			let obj = objects[0].object;
			while (obj.parent && obj.parent.type === 'Group')
				obj = obj.parent;
			if (!obj.userData)
				return;
			clickObject(obj as Group);
		} else {
			setSelected(null);
		}
	}, [scene.children, selected]);

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
