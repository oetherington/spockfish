import React, { useState } from 'react';
import Flex from '@react-css/flex';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import TimerIcon from '@mui/icons-material/Timer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import Color from '~/engine/Color';
import TimeControl from '~/utils/TimeControl';
import s from '~/styles/NewGame.module.scss';

const timeControlsEqual = (a: TimeControl, b: TimeControl) =>
	a.mins === b.mins && a.inc === b.inc;

type TimeControlOptProps = {
	timeControl: TimeControl,
	selected: boolean,
	onClick: () => void,
}

const TimeControlOpt = ({
	timeControl,
	selected,
	onClick,
}: TimeControlOptProps) => {
	const { mins, inc } = timeControl;

	let tooltip = `${mins} minute${mins === 1 ? '' : 's'} per side`
	if (inc > 0)
		tooltip += ` plus ${inc} seconds extra each move`

	return (
		<Tooltip title={tooltip}>
			<span
				className={selected ? 'selected' : undefined}
				onClick={onClick}
			>
				{mins + '+' + inc}
			</span>
		</Tooltip>
	);
};

const PlayTheAI = () => {
	const timeControls: TimeControl[] = [
		{ mins: 1,  inc: 0 },
		{ mins: 3,  inc: 2 },
		{ mins: 5,  inc: 5 },
		{ mins: 10, inc: 5 },
	];

	const [timeControl, setTimeControl] =
		useState<TimeControl>(timeControls[1]);
	const [color, setColor] = useState<Color>('w');

	const url = `/play/ai/${color}/${timeControl.mins}/${timeControl.inc}`;

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
					timeControls.map((tc, index) => <TimeControlOpt
						key={index}
						timeControl={tc}
						selected={timeControlsEqual(timeControl, tc)}
						onClick={() => setTimeControl(tc)}
					/>)
				}
			</Flex>
			<Link href={url}>
				<a>
					<Flex alignItems='center' className={s.engage} gap='0.2em'>
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

type NewGamePage = 'play-the-ai' | 'find-a-game' | 'custom-challenge';

type NewGameContentProps = {
	value: NewGamePage,
}

const NewGameContent = ({ value }: NewGameContentProps) => {
	switch (value) {
		case 'play-the-ai':       return <PlayTheAI />;
		case 'find-a-game':       return <FindAGame />;
		case 'custom-challenge':  return <CustomChallenge />;
	}
};

const Chevron = () => <ArrowForwardIosIcon fontSize='small' />;

type PageSpec = {
	page: NewGamePage,
	text: string,
	color: string,
}

const NewGame = () => {
	const [value, setValue] = useState<NewGamePage>('play-the-ai');

	const pages: PageSpec[] = [
		{
			page: 'play-the-ai',
			text: 'Play the AI',
			color: 'trek-blue-bg',
		},
		{
			page: 'find-a-game',
			text: 'Find A Game',
			color: 'trek-green-bg',
		},
		{
			page: 'custom-challenge',
			text: 'Custom Challenge',
			color: 'trek-yellow-bg',
		},
	];

	return (
		<Flex justifyContent='center'>
			<Flex column className='icars-1'>
				<div className='icars-top-1'></div>
				<div className='icars-subtop-1'></div>
				{
					pages.map(({ page, text, color }, index) =>
						<div
							key={index}
							className={`icars-menu-item ${color}`}
							onClick={() => setValue(page)}
						>
							{value === page && <Chevron />}
							{text}
						</div>
					)
				}
				<div className='icars-subbottom-1'></div>
				<div className='icars-bottom-1'></div>
			</Flex>
			<Flex column justifyContent='center' className='icars-2'>
				<div className='icars-top-2'>
					<div className='icars-notch'></div>
				</div>
				<div className='icars-subtop-2'></div>
				<div className='icars-content' style={{ width: '100%' }}>
					<NewGameContent value={value} />
				</div>
				<div className='icars-subbottom-2-wrapper'>
					<div className='icars-subbottom-2'></div>
				</div>
				<div className='icars-bottom-2'>
					<div className='icars-notch'></div>
				</div>
			</Flex>
		</Flex>
	);
};

export default NewGame;
