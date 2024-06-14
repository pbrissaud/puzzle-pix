"use client";
import socketClient  from "socket.io-client";

const GamePage = () => {
  const socket = socketClient("http://localhost:3001");
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}

export default GamePage;