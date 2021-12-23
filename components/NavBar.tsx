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
import Link from 'next/link';
import Image from 'next/image';
import Flex from '@react-css/flex';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TrekIcon from '~/public/emblem.svg';
import s from '~/styles/NavBar.module.scss';

const NavBar = () => {
	const showMenuButton = false;

	return (
		<Flex justifySpaceBetween className={s.navbar}>
			<Link href='/'>
				<a>
					<Flex alignItemsCenter columnGap='10px'>
						<Image
							src={TrekIcon.src}
							alt='Spockfish Logo'
							width='20px'
							height='30px'
						/>
						<Typography
							className='treky-link'
							variant='h4'
							component='span'
						>
							Spockfish
						</Typography>
					</Flex>
				</a>
			</Link>
			{showMenuButton &&
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>}
		</Flex>
	);
};

export default NavBar;
