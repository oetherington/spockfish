import { Group } from 'three';
import Piece from '~/engine/Piece';
import Move from '~/engine/Move';

type SelectedPiece = {
	obj: Group;
	piece: Piece;
	legalMoves: Move[];
}

export default SelectedPiece;
