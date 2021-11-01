import React, { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { WebGLRenderer, Camera, Vector3, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useDomEvent from '~/hooks/useDomEvent';
import MainBoard from './MainBoard';
import AttackBoard from './AttackBoard';
import PieceComponent from './Piece';
import Renderer from './Renderer';
import Piece from '~/engine/Piece';
import Position from '~/engine/Position';

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
	position: Position,
	width: number,
	height: number,
}

const Board = ({ position, width, height }: BoardProps) => {
	const { gl, camera, setSize, raycaster, scene } = useThree();

	const [controls] = useState<OrbitControls>(makeControls(gl, camera));

	useFrame((state, delta) => controls.update());

	useEffect(() => {
		setSize(width, height);
	}, [width, height]);

	const [selected, setSelected] = useState<Group | null>(null);

	const selectPiece = (obj: Group) =>
		setSelected(obj === selected ? null : obj);

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

	const whiteAttackBoards = position.getWhiteAttackBoards();
	const blackAttackBoards = position.getBlackAttackBoards();

	const pieces = position.getPieces();

	return (
		<Renderer outlinedRefs={selected ? [selected] : []}>
			<MainBoard level={'W'} />
			<MainBoard level={'N'} />
			<MainBoard level={'B'} />
			<AttackBoard color={'w'} level={whiteAttackBoards[0]} />
			<AttackBoard color={'w'} level={whiteAttackBoards[1]} />
			<AttackBoard color={'b'} level={blackAttackBoards[0]} />
			<AttackBoard color={'b'} level={blackAttackBoards[1]} />
			<>
				{
					pieces.map((piece: Piece, index: number) =>
						<PieceComponent key={index} {...piece} />
					)
				}
			</>
		</Renderer>
	);
};

export default Board;
