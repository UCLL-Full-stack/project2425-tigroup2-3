import React from 'react';
import { PieceCode, PieceColor, PieceDTO, PieceType, pieceTypeCode, Reskin } from '@/types';


interface ChessboardProps {
    reskins?: Reskin[];
    theme?: string;
    boardSize?: number;
    position?: Record<string, string>;
    perspective?: 'white' | 'black';
};
const Chessboard = ({ 
    reskins = [],
    theme = '_default', 
    boardSize = 400, 
    position: pieces,
    perspective = 'white',
}: ChessboardProps) => {
  const boardPath = `/board/${theme}.png`;

  // Default position if no pieces are provided
  const defaultPieces = {
    a8: 'bR', b8: 'bN', c8: 'bB', d8: 'bQ', e8: 'bK', f8: 'bB', g8: 'bN', h8: 'bR',
    a7: 'bP', b7: 'bP', c7: 'bP', d7: 'bP', e7: 'bP', f7: 'bP', g7: 'bP', h7: 'bP',
    a2: 'wP', b2: 'wP', c2: 'wP', d2: 'wP', e2: 'wP', f2: 'wP', g2: 'wP', h2: 'wP',
    a1: 'wR', b1: 'wN', c1: 'wB', d1: 'wQ', e1: 'wK', f1: 'wB', g1: 'wN', h1: 'wR',
  };

  const currentPieces = pieces ?? defaultPieces;
  
const toPieceCode = ({type, color}: PieceDTO): PieceCode => {
    const pieceColorCode = color === 'WHITE' as PieceColor ? 'w' : 'b';
    const pieceTypeCode = type === "KNIGHT" as PieceType? "N" : type[0].toUpperCase() as pieceTypeCode;
    return `${pieceColorCode}${pieceTypeCode}` as PieceCode;
}

  // Calculate tile size based on board size
  const tileSize = boardSize / 8;

  return (
    <div
      style={{
        position: 'relative',
        width: boardSize,
        height: boardSize,
        flexShrink: 0,
        backgroundImage: `url(${boardPath})`,
        backgroundSize: 'cover',
        transform: perspective === 'black' ? 'rotate(180deg)' : 'none',
      }}
    >
      {Object.entries(currentPieces).map(([position, pieceCode]) => {
        const pieceTheme = reskins.find(({ piece }) => toPieceCode(piece) === pieceCode)?.theme.name || '_default';
        const piecePath = `/piece/${pieceTheme}/${pieceCode}.svg`;

        // Convert chess position (like e4) to indices ([4, 4])
        const file = position.charCodeAt(0) - 'a'.charCodeAt(0); // Column (0-indexed)
        const rank = 8 - parseInt(position[1], 10); // Row (0-indexed, from top)

        return (
          <img
            key={position}
            src={piecePath}
            alt={pieceCode}
            style={{
              position: 'absolute',
              top: rank * tileSize,
              left: file * tileSize,
              width: tileSize,
              height: tileSize,
              transform: perspective === 'black' ? 'rotate(180deg)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
};

export default Chessboard;

// Usage Example:
// <Chessboard
//   theme="_default"
//   boardSize={600}
//   pieces={{
//     e4: 'wK', // White King at e4
//     d5: 'bQ', // Black Queen at d5
//   }}
// />
