import React from 'react';
import Dialog from '@mui/material/Dialog';
import Color from '~/engine/Color';
import Sprite from './Sprite';
import { PieceType } from '~/engine/Piece';
import s from '~/styles/Promotion.module.scss';

type PromotionProps = {
	color: Color,
	resolve: (pieceType: PieceType) => void,
}

const Promotion = ({ color, resolve }: PromotionProps) => {
	return (
		<Dialog open={true}>
			<div className={s.promSprite} onClick={() => resolve('q')}>
				<Sprite piece={'q'} color={color} />
			</div>
			<div className={s.promSprite} onClick={() => resolve('n')}>
				<Sprite piece={'n'} color={color} />
			</div>
			<div className={s.promSprite} onClick={() => resolve('r')}>
				<Sprite piece={'r'} color={color} />
			</div>
			<div className={s.promSprite} onClick={() => resolve('b')}>
				<Sprite piece={'b'} color={color} />
			</div>
		</Dialog>
	);
};

export default Promotion;
