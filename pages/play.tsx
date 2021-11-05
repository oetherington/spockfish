import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/Layout';
import BoardView from '~/components/spockfish-board/BoardView';
import useDomEvent from '~/hooks/useDomEvent';

const getNavbarHeight = () => parseInt(
	getComputedStyle(document.body).getPropertyValue('--navbar-height')
);

type BoardSize = {
	width: number,
	height: number,
}

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
	const [boardSize, setBoardSize] = useState<BoardSize>(calculateBoardSize());

	useDomEvent(null, 'resize', () => setBoardSize(calculateBoardSize()));

	return (
		<Layout>
			<BoardView {...boardSize} />
		</Layout>
	);
};

export default Play;
