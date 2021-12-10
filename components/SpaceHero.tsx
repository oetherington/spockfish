import React from 'react';
import s from '~/styles/SpaceHero.module.scss';

const SpaceHero = () => {
	return (
		<div className={s.spaceHero}>
			<div className={s.spaceHeroTwinkle}></div>
			<div className={s.createdBy}>
				<h1>Spockfish</h1>
				<div>
					<h3>Created<br/>By</h3>
					<h2>Ollie</h2>
				</div>
				<h2>Etherington</h2>
			</div>
			<div className={s.website}>
				<a href='https://www.etherington.io'>www.etherington.io</a>
			</div>
		</div>
	);
};

export default SpaceHero;
