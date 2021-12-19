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
