"use client"

import {Piece} from '@repo/db';
import Draggable, {DraggableEventHandler} from "react-draggable";
import React, {useEffect, useRef, useState} from "react";
import {Socket} from "socket.io-client";
import {cn} from "@ui/lib/utils";

const PuzzlePiece = ({piece, socket}: { piece: Piece, socket: Socket }) => {
  const nodeRef = useRef(null);
  const [currentPiece, setCurrentPiece] = useState(piece);

  useEffect(() => {
    const handlePieceUpdate = (updatedPiece: Piece) => {
      if (updatedPiece.id === piece.id) {
        setCurrentPiece(updatedPiece);
      }
    };

    socket.on("piece-update", handlePieceUpdate);

    return () => {
      socket.off("piece-update", handlePieceUpdate);
    };
  }, [piece.id, socket]);

  const handlePieceMoving: DraggableEventHandler = () => {
    socket.emit("piece-move-start", piece.id);
  };

  const handlePieceStopMoving: DraggableEventHandler = (_, data) => {
    socket.emit("piece-move-stop", piece.id, {
      posX: data.x,
      posY: data.y
    });
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" onStart={handlePieceMoving} onStop={handlePieceStopMoving}
               position={{x: currentPiece.posX, y: currentPiece.posY}} disabled={!currentPiece.movable}>
      <div
        ref={nodeRef}
        className={cn(!currentPiece.movable ? "border-destructive" : "border-black", "absolute border")}
        style={{
          left: `${currentPiece.posX}px`,
          top: `${currentPiece.posY}px`,
        }}
      >
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src={`data:image/png;base64,${currentPiece.imgBuffer}`} alt={`Puzzle Piece ${currentPiece.id}`}
             draggable={false} id={currentPiece.order}/>
      </div>
    </Draggable>
  )
}

export default PuzzlePiece;