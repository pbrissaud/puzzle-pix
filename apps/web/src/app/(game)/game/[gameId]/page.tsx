"use client";
import {io, Socket} from "socket.io-client";
import {useEffect, useState} from "react";

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

const GamePage = () => {
  const socket = useSocket("http://localhost:3001");
  const [socketId, setSocketId] = useState<string | null>(null);
  const [clientCount, setClientCount] = useState<number>(0);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setSocketId(socket.id!);
      });

      socket.on("clientCount", (count: number) => {
        setClientCount(count);
      });

      return () => {
        socket.off("clientCount");
      };
    }
  }, [socket]);

  return (
    <div>
      <h1>Page</h1>
      {socketId ? <div><p>I'm the socket number {socketId}</p></div> :
        <p>Connecting...</p>}
      <p>Connected clients: {clientCount}</p>
    </div>
  );
};

export default GamePage;