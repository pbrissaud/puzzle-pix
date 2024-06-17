"use client";

import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Room} from "@repo/db";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@ui/components/ui/dialog";

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

const RoomScreen = ({room, isFull}: { room: Room, isFull: boolean },) => {
    const socket = useSocket("http://localhost:3001");
    const [clientCount, setClientCount] = useState<number>(0);
    const [playerName, setPlayerName] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isFull) {
            setDialogOpen(true);
        }
    }, [isFull]);

    useEffect(() => {
        if (socket && !isFull) {
            socket.emit("room-join", room.id, (val: any) => {
                setPlayerName(val);
            });

            socket.on("room-nb-players", (count: number) => {
                setClientCount(count);
            });

            return () => {
                socket.off("room-join");
                socket.off("room-nb-players");
            };
        }
    }, [socket, room, isFull]); // Add game._id as a dependency

    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div>
            <p>Connected clients: {clientCount}</p>
            <p>Your name: {playerName}</p>
        </div>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>The room is full</DialogTitle>
              </DialogHeader>
              <div>
                  <p>Sorry, the room is full. Please try again later.</p>
              </div>
          </DialogContent>
      </Dialog>
    );
};

export default RoomScreen;