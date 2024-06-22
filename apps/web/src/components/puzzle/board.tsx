import {api} from "../../trpc/react";
import {Socket} from "socket.io-client";
import PuzzlePiece from "./piece";
import {useEffect, useState} from "react";
import {Piece} from "@repo/db";

const PuzzleBoard = ({roomId, socket}: { roomId: string, socket: Socket }) => {
  const {data: initialPieces} = api.room.piece.list.useQuery({roomId});

  const [pieces, setPieces] = useState(initialPieces || []);

  useEffect(() => {
    if (initialPieces) {
      setPieces(initialPieces);
    }
  }, [initialPieces]);

  useEffect(() => {
    const handlePieceUpdate = (updatedPiece: Piece) => {
      console.log("piece-update", updatedPiece);
      setPieces((prevPieces) => {
        return prevPieces.map(piece => piece.id === updatedPiece.id ? updatedPiece : piece);
      });
    };

    socket.on("piece-update", handlePieceUpdate);

    return () => {
      socket.off("piece-update", handlePieceUpdate);
    };
  }, [socket]);

  if (!pieces) {
    return <div>Loading pieces</div>
  }

  return (
    <div className={`relative h-full w-full bg-cover bg-center bg-no-repeat overflow-scroll`}>
      {pieces.map((piece) => (
        <PuzzlePiece piece={piece} key={piece.id} socket={socket}/>
      ))}
    </div>
  );
};

export default PuzzleBoard;