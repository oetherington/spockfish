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
