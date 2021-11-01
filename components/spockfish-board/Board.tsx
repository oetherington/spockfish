import React, { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useDomEvent from '../../hooks/useDomEvent';
import MainBoard from './MainBoard';
import AttackBoard from './AttackBoard';
import Piece from './Piece';
import Renderer from './Renderer';

const makeControls = (gl, camera) => {
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

const Board = ({ position, width, height }) => {
	const { gl, camera, setSize, raycaster, scene } = useThree();

	const [controls] = useState(makeControls(gl, camera));

	useFrame((state, delta) => controls.update());

	useEffect(() => {
		setSize(width, height);
	}, [width, height]);

	const [selected, setSelected] = useState(null);

	const selectPiece = ref => setSelected(ref === selected ? null : ref);

	const clickObject = obj => {
		if (obj.metadata.piece || obj.metadata.abLevel) {
			selectPiece(obj);
		} else if (obj.metadata.square) {
			setSelected(null);
		}
	};

	useDomEvent(gl.domElement, 'click', () => {
		const objects = raycaster.intersectObjects(scene.children);
		if (objects.length > 0) {
			let obj = objects[0].object;
			while (obj.parent && obj.parent.type === 'Group')
				obj = obj.parent;
			if (!obj.metadata)
				return;
			clickObject(obj);
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
			{pieces.map((piece, index) =>
				<Piece key={index} {...piece} />)
			}
		</Renderer>
	);
};

export default Board;
