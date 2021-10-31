import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import BoardView from '../components/spockfish-board/BoardView';

const getNavbarHeight = () => parseInt(
	getComputedStyle(document.body).getPropertyValue('--navbar-height')
);

const calculateBoardSize = () => typeof window !== 'undefined'
	? {
		width: window.innerWidth,
		height: window.innerHeight - getNavbarHeight(),
	}
	: {
		width: 400,
		height: 400,
	};

const Play: NextPage = () => {
	const [boardSize, setBoardSize] = useState(calculateBoardSize());

	useEffect(() => {
		const resize = ev => setBoardSize(calculateBoardSize());
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	});

	return (
		<Layout>
			<BoardView {...boardSize} />
		</Layout>
	);
};

export default Play;
