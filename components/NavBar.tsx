import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Flex from '@react-css/flex';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TrekIcon from '~/public/emblem.svg';
import s from '~/styles/NavBar.module.scss';

const NavBar = () => {
	const showMenuButton = false;

	return (
		<Flex justifySpaceBetween className={s.navbar}>
			<Link href='/'>
				<a>
					<Flex alignItemsCenter columnGap='10px'>
						<Image
							src={TrekIcon.src}
							alt='Spockfish Logo'
							width='20px'
							height='30px'
						/>
						<Typography
							className='treky-link'
							variant='h4'
							component='span'
						>
							Spockfish
						</Typography>
					</Flex>
				</a>
			</Link>
			{showMenuButton &&
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>}
		</Flex>
	);
};

export default NavBar;
