import React, { useState } from 'react';
import Flex from '@react-css/flex';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import TimerIcon from '@mui/icons-material/Timer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';

const TimeControl = ({ minutes, increment, selected, onClick }) => {
	let tooltip = `${minutes} minute${minutes === 1 ? '' : 's'} per side`
	if (increment > 0)
		tooltip += ` plus ${increment} seconds extra each move`

	return (
		<Tooltip title={tooltip}>
			<span className={selected ? 'selected' : null} onClick={onClick}>
				{minutes + '+' + increment}
			</span>
		</Tooltip>
	);
};

const PlayTheComputer = () => {
	const timeControls = [
		[ 1, 0 ],
		[ 3, 2 ],
		[ 5, 5 ],
		[ 10, 5 ],
	];

	const [timeControl, setTimeControl] = useState(timeControls[1]);
	const [color, setColor] = useState('w');

	const timeControlsEqual = ([ ma, ia ], [mb, ib]) => ma === mb && ia === ib;

	const url = `/play/ai/${color}/${timeControl[0]}/${timeControl[1]}`;

	return (
		<Flex column gap='10px' alignItems='center'>
			<div className='trek-aqua-green trek-font text-x2'>Play The AI</div>
			<br />
			<Flex gap='15px' alignItems='center' className='new-game-color'>
				<span
					className={color === 'b' ? 'selected' : ''}
					onClick={() => setColor('b')}
				>
					Black
				</span>
				<InvertColorsIcon />
				<span
					className={color === 'w' ? 'selected' : ''}
					onClick={() => setColor('w')}
				>
					White
				</span>
			</Flex>
			<Flex alignItems='center' gap='2em'>
				<TimerIcon />
				{
					timeControls.map(([ mins, inc ], index) => <TimeControl
						key={index}
						minutes={mins}
						increment={inc}
						selected={timeControlsEqual(timeControl, [ mins, inc ])}
						onClick={() => setTimeControl([ mins, inc ])}
					/>)
				}
			</Flex>
			<Link href={url}>
				<a>
					<Flex
						alignItems='center'
						className='new-game-engage'
						gap='0.2em'
					>
						Engage
						<PlayCircleFilledIcon />
					</Flex>
				</a>
			</Link>
		</Flex>
	);
};

const FindAGame = () => {
	return (
		<Flex column gap='10px' alignItems='center'>
			<div className='trek-aqua-green trek-font text-x2'>
				Find A Game
			</div>
			<br />
			<div>Coming Soon</div>
		</Flex>
	);
};

const CustomChallenge = () => {
	return (
		<Flex column gap='10px' alignItems='center'>
			<div className='trek-aqua-green trek-font text-x2'>
				Custom Challenge
			</div>
			<br />
			<div>Coming Soon</div>
		</Flex>
	);
};

const NewGameContent = ({ value }) => {
	switch (value) {
		case 1:  return <FindAGame />;
		case 2:  return <CustomChallenge />;
		default: return <PlayTheComputer />;
	}
};

const Chevron = () => <ArrowForwardIosIcon fontSize='small' />;

const NewGame = () => {
	const [value, setValue] = React.useState(0);

	return (
		<Flex justifyContent='center'>
			<Flex column className='icars-1'>
				<div className='icars-top-1'></div>
				<div className='icars-subtop-1'></div>
				<div
					className='icars-menu-item trek-blue-bg'
					onClick={() => setValue(0)}
				>
					{value === 0 && <Chevron />}
					Play the AI
				</div>
				<div
					className='icars-menu-item trek-green-bg'
					onClick={() => setValue(1)}
				>
					{value === 1 && <Chevron />}
					Find a game
				</div>
				<div
					className='icars-menu-item trek-yellow-bg'
					onClick={() => setValue(2)}
				>
					{value === 2 && <Chevron />}
					Custom challenge
				</div>
				<div className='icars-subbottom-1'></div>
				<div className='icars-bottom-1'></div>
			</Flex>
			<Flex column justifyContent='center' className='icars-2'>
				<div className='icars-top-2'></div>
				<div className='icars-subtop-2'></div>
				<div className='icars-content' style={{ width: '100%' }}>
					<NewGameContent value={value} />
				</div>
				<div className='icars-subbottom-2-wrapper'>
					<div className='icars-subbottom-2'></div>
				</div>
				<div className='icars-bottom-2'></div>
			</Flex>
		</Flex>
	);
};

export default NewGame;
