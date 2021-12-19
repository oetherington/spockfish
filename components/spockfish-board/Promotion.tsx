import React from 'react';
import Dialog from '@mui/material/Dialog';
import Color from '~/engine/Color';
import Sprite from './Sprite';
import s from '~/styles/Promotion.module.scss';

type PromotionProps = {
	color: Color,
}

const Promotion = ({ color }: PromotionProps) => {
	return (
		<Dialog open={true}>
			<div className={s.promSprite}>
				<Sprite piece={'q'} color={color} />
			</div>
			<div className={s.promSprite}>
				<Sprite piece={'n'} color={color} />
			</div>
			<div className={s.promSprite}>
				<Sprite piece={'r'} color={color} />
			</div>
			<div className={s.promSprite}>
				<Sprite piece={'b'} color={color} />
			</div>
		</Dialog>
	);
};

export default Promotion;
