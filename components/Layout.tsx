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
