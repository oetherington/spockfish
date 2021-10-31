import React, { useState, useEffect } from 'react';
import PageHead from './PageHead';
import NavBar from './NavBar';

const Layout = ({ title = 'Spockfish', children }) => {
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
