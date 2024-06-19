import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

const useSocket = (): Socket | null => {
  const url = process.env.NEXT_PUBLIC_WS_URL!;
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

export default useSocket;