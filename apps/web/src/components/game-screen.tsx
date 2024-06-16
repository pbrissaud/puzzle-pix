"use client";

import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Game} from "../types/game";

const useSocket = (url: string): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to server");
        });

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    return socket;
};

const GameScreen = ({game}: { game: Game }) => {
    const socket = useSocket("http://localhost:3001");
    const [clientCount, setClientCount] = useState<number>(0);

    useEffect(() => {
        if (socket) {
            socket.emit("room-join", game._id);

            socket.on("room-nb-players", (count: number) => {
                setClientCount(count);
            });

            return () => {
                socket.off("room-join");
                socket.off("room-nb-players");
            };
        }
    }, [socket, game._id]); // Add game._id as a dependency

    return (
        <div>
            <h1>Page</h1>
            <p>Connected clients: {clientCount}</p>
        </div>
    );
};

export default GameScreen;