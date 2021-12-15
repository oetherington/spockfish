import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Flex from '@react-css/flex';
import Layout from '~/components/Layout';
import NewGame from '~/components/NewGame';
import SpaceHero from '~/components/SpaceHero';

const Home: NextPage = () => {
	return (
		<Layout>
			<Flex
				column
				justifyContent='center'
				className='full-height-minus-nav'
			>
				<h1 className='trek-headline'>Star Trek Tri-Chess</h1>
				<NewGame />
			</Flex>
			<SpaceHero />
		</Layout>
	);
};

export default Home;
