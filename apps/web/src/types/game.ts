import {ObjectId} from "mongodb";

enum Role {
    player = 'player',
    admin = 'admin'
}

type Player = {
    socketId: string;
    role: Role;
    score: number;
}

export type GameDocument = {
    _id: ObjectId;
    name: string;
    public: boolean;
    author: string;
    createdAt: any
    img: string;
    slots: number;
    players: Player[];
    nbPieces: number;
}


export type Game = {
    _id: string;
    name: string;
    public: boolean;
    author: string;
    createdAt: Date
    img: string;
    slots: number;
    players: Player[];
    nbPieces: number;
}