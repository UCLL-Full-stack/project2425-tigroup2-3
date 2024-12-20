// export const enum Color {
//     "WHITE",
//     "BLACK"
// }

// export const enum PieceType {
//     "KING",
//     "QUEEN",
//     "ROOK",
//     "BISHOP",
//     "KNIGHT",
//     "PAWN"
// }

type PieceColor = "WHITE" | "BLACK";
type PieceType = "KING" | "QUEEN" | "ROOK" | "BISHOP" | "KNIGHT" | "PAWN";
type PieceString = `${PieceColor} ${PieceType}`;

type pieceColorCode = "w" | "b";
type pieceTypeCode = "K" | "Q" | "R" | "B" | "N" | "P";
type PieceCode = `${pieceColorCode}${pieceTypeCode}`;

type Theme = {
    id?: number;
    name: string;
}

type PieceDTO = {
    type: PieceType;
    color: PieceColor;
}

type Reskin = {
    piece: PieceDTO;
    theme: Theme;
}

type Preset = {
    id?: number;
    name?: string;
    userId?: number;
    reskins: Reskin[];
    isActive?: boolean;
}

type User = {
    id?: number;
    username?: string;
    password?: string;
    role?: string;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
    userId: number;
}

// type Piece = {
//     type: PieceType;
//     color: Color;
// }

// type PieceDTO = {
//     type: string;
//     color: string;
// }

// type Loadout = Map<PieceDTO, string>;

// type Reskin = {
//     piece: PieceDTO;
//     theme: {
//         id: number;
//         name: string;
//     }
// }

export type { 
    PieceColor, 
    PieceType, 
    PieceString,

    pieceColorCode, 
    pieceTypeCode, 
    PieceCode, 
    PieceDTO,
    
    Theme, 
    Reskin,
    Preset,
    
    User,
    AuthenticationResponse,
};