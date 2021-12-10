import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '~/components/Layout';
import NewGame from '~/components/NewGame';
import SpaceHero from '~/components/SpaceHero';

const Home: NextPage = () => {
	return (
		<Layout>
			<div className='spacer'/>
			<h1 className='trek-headline'>Star Trek Tri-Chess</h1>
			<NewGame />
			<div className='spacer'/>
			<SpaceHero />
		</Layout>
	);
};

export default Home;
