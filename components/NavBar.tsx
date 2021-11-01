import React from 'react';
import Link from 'next/link';
import Flex from '@react-css/flex';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TrekIcon from '~/public/emblem.svg';

const NavBar = () => {
	return (
		<Flex
			justifySpaceBetween
			style={{
				width: '100%',
				height: 'var(--navbar-height)',
				maxHeight: 'var(--navbar-height)',
				background: 'var(--trek-black)',
				padding: '5px 10px',
				borderBottom: '1px solid var(--trek-blue)',
				boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
				zIndex: 1,
			}}
		>
			<Link href='/'>
				<a>
					<Flex alignItemsCenter columnGap='10px'>
						<img src={TrekIcon.src} height='30px' />
						<Typography
							className='trek-font'
							variant='h4'
							component='span'
						>
							Spockfish
						</Typography>
					</Flex>
				</a>
			</Link>
			<IconButton
				edge='start'
				color='inherit'
				aria-label='menu'
				sx={{ mr: 2 }}
			>
				<MenuIcon />
			</IconButton>
		</Flex>
	);
};

export default NavBar;
