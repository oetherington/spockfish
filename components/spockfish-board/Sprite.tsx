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

import React from 'react';
import Image from 'next/image';
import Color from '~/engine/Color';
import { PieceType } from '~/engine/Piece';
import WK from '~/public/sprites/wk.svg';
import WQ from '~/public/sprites/wq.svg';
import WR from '~/public/sprites/wr.svg';
import WB from '~/public/sprites/wb.svg';
import WN from '~/public/sprites/wn.svg';
import WP from '~/public/sprites/wp.svg';
import BK from '~/public/sprites/bk.svg';
import BQ from '~/public/sprites/bq.svg';
import BR from '~/public/sprites/br.svg';
import BB from '~/public/sprites/bb.svg';
import BN from '~/public/sprites/bn.svg';
import BP from '~/public/sprites/bp.svg';

type PieceConfig = {
	name: string,
	w: string,
	b: string,
};

const pieces: Record<PieceType, PieceConfig> = {
	'k': {
		name: 'King',
		w: WK.src,
		b: BK.src,
	},
	'q': {
		name: 'Queen',
		w: WQ.src,
		b: BQ.src,
	},
	'r': {
		name: 'Rook',
		w: WR.src,
		b: BR.src,
	},
	'b': {
		name: 'Bishop',
		w: WB.src,
		b: BB.src,
	},
	'n': {
		name: 'Knight',
		w: WN.src,
		b: BN.src,
	},
	'p': {
		name: 'Pawn',
		w: WP.src,
		b: BP.src,
	},
};

type SpriteProps = {
	piece: PieceType,
	color: Color,
};

const Sprite = ({ piece, color }: SpriteProps) => {
	return (
		<div>
			<Image
				src={pieces[piece][color]}
				alt={pieces[piece].name}
				width='50px'
				height='50px'
			/>
		</div>
	);
};

export default Sprite;
