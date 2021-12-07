import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import PlayPage from '~/components/PlayPage';

const Play: NextPage = () => {
	const router = useRouter();
	return <PlayPage router={router} />;
};

export default Play;
