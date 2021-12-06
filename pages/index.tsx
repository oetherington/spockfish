import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '~/components/Layout';
import NewGame from '~/components/NewGame';

const Home: NextPage = () => {
	return (
		<Layout>
			<div className='spacer'/>

			<NewGame />

			<div className='spacer'/>

			<div className='space-hero'>
				<div className='space-hero-twinkle'></div>
				<div className='created-by'>
					<h1>Spockfish</h1>
					<div>
						<h3>Created<br/>By</h3>
						<h2>Ollie</h2>
					</div>
					<h2>Etherington</h2>
				</div>
				<div className='website'>
					<a href='https://www.etherington.io'>www.etherington.io</a>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
