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
