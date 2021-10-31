const trekColors = {
	red: '#cc0c00',
	blue: '#5c88da',
	green: '#84bd00',
	yellow: '#ffcd00',
	grey: '#7c878e',
	black: '#151515',
	aquaBlue: '#00b5e2',
	aquaGreen: '#00af66',
};

export const colorToInt = c => parseInt(c.substring(1), 16);

export const boardDepth = 0.1;

export const rankOffsets = {
	W: 0,
	N: 2,
	B: 4,
};

export const levelGap = 1.5;

export const heightOffsets = {
	W: -2 * levelGap,
	N: 0 * levelGap,
	B: 2 * levelGap,
	KL1: -1 * levelGap,
	KL2: -1 * levelGap,
	KL3: 1 * levelGap,
	KL4: 1 * levelGap,
	KL5: 3 * levelGap,
	KL6: 3 * levelGap,
	QL1: -1 * levelGap,
	QL2: -1 * levelGap,
	QL3: 1 * levelGap,
	QL4: 1 * levelGap,
	QL5: 3 * levelGap,
	QL6: 3 * levelGap,
};

const getAttackBoardFileOffset = level => level[0] === 'Q' ? -2.5 : 1.5;

export const getBoardPosition = level => [
	level.length === 1 ? -1.5 : getAttackBoardFileOffset(level),
	heightOffsets[level] - boardDepth,
	4.5,
];

export const stalkSize = {
	radius: 0.05,
	height: levelGap,
	segments: 6,
};

export const getStalkPosition = level => [
	getAttackBoardFileOffset(level) + 0.5,
	heightOffsets[level] - (stalkSize.height / 2) - boardDepth,
	4 - getAttackLevelRanks(level)[0],
];

export const pieceScale = 0.14;

const pieceOffset = -0.1;

export const getAttackLevelFiles = level => level[0] === 'W'
	? [ 'z', 'a' ]
	: [ 'd', 'e' ];

export const getAttackLevelRanks = level => {
	const ranks = [
		[ 0, 1 ],
		[ 4, 5 ],
		[ 2, 3 ],
		[ 6, 7 ],
		[ 4, 5 ],
		[ 8, 9 ],
	];

	return ranks[parseInt(level[2]) - 1];
};

const pieceFileOffsets = {
	z: -2.5,
	a: -1.5,
	b: -0.5,
	c: 0.5,
	d: 1.5,
	e: 2.5,
};

export const getSquarePosition = (file, rank, level) => {
	return [
		pieceFileOffsets[file],
		heightOffsets[level] + pieceOffset,
		4.5 - rank,
	];
};

export const lightSquareColor = trekColors.green;
export const darkDarkColor = trekColors.blue

export const pieceColors = {
	w: trekColors.grey,
	b: trekColors.black,
};

export const pieceRotations = {
	w: {
		p: 0,
		n: Math.PI,
		b: 3 * Math.PI / 2,
		r: 0,
		q: 0,
		k: 0,
	},
	b: {
		p: 0,
		n: 0,
		b: Math.PI / 2,
		r: 0,
		q: 0,
		k: 0,
	},
};

export const outlineColor = trekColors.aquaBlue;
export const outlineStrength = 50;
export const outlineThickness = 0.3;
