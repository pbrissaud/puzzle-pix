import React from 'react';
import {api} from "../../trpc/react";
import Draggable from 'react-draggable';

const PuzzleBoard = ({roomId}: { roomId: string }) => {
  const {data: pieces} = api.room.listPieces.useQuery({roomId}, {
    staleTime: 1000,
    refetchInterval: 1000,
  });

  if (!pieces) {
    return <div>Loading pieces</div>
  }

  return (
    <div className={`relative h-full w-full bg-cover bg-center bg-no-repeat`}>
      {pieces.map((piece) => (
        <Draggable key={piece.id} bounds="parent">
          <div
            id={piece.order}
            className="absolute border border-black"
            style={{
              left: `${piece.posX}px`,
              top: `${piece.posY}px`,
            }}
          >
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img src={`data:image/png;base64,${piece.imgBuffer}`} alt={`Puzzle Piece ${piece.id}`} draggable={false}/>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default PuzzleBoard;