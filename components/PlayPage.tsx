import React, { useState, useRef } from 'react';
import Layout from '~/components/Layout';
import BoardView from '~/components/spockfish-board/BoardView';
import useDomEvent from '~/hooks/useDomEvent';
import PlayController from '~/controllers/PlayController';
import PlayConfig from '~/utils/PlayConfig';
import type { NextRouter } from 'next/router';

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

type PlayPageProps = {
	router: NextRouter,
}

const PlayPage = ({ router }: PlayPageProps) => {
	const [boardSize, setBoardSize] = useState<BoardSize>(calculateBoardSize());

	useDomEvent(null, 'resize', () => setBoardSize(calculateBoardSize()));

	const config = useRef<PlayConfig | null>(null);

	if (!config.current && router && router.isReady)
		config.current = PlayController.init(router);

	return (
		<Layout>
			{
				config.current
					? <BoardView {...boardSize} {...config.current} />
					: <></>
			}
		</Layout>
	);
};

export default PlayPage;
