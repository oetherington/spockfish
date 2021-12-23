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
