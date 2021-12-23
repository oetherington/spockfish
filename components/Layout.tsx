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
import PageHead from './PageHead';
import NavBar from './NavBar';

type LayoutProps = {
	title?: string,
	children: JSX.Element[] | JSX.Element,
}

const Layout = ({ title = 'Spockfish', children }: LayoutProps) => {
	return (
		<div className="page-container">
			<PageHead title={title} />
			<main>
				<NavBar />
				{children}
			</main>
		</div>
	);
};

export default Layout;
