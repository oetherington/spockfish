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
import Head from 'next/head';

const PageHead = ({ title = 'Spockfish' }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content='Play Star Trek 3D Chess' />
			<link rel='icon' href='/favicon.ico' />
			<link
				rel='apple-touch-icon'
				sizes='180x180'
				href='/apple-touch-icon.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='/favicon-32x32.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href='/favicon-16x16.png'
			/>
			<link rel='manifest' href='/site.webmanifest' />
			<link
				rel='mask-icon'
				href='/safari-pinned-tab.svg'
				color='#ffcd00'
			/>
			<meta name='msapplication-TileColor' content='#2b5797' />
			<meta name='theme-color' content='#151515' />
		</Head>
	);
};

export default PageHead;
