import React from 'react';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import Draggable from 'react-draggable';
import {Button} from '@repo/ui/components/ui/button';

const PuzzleBoard = () => {
  return (
    <TransformWrapper>
      {({zoomIn, zoomOut, resetTransform}) => (
        <div className="w-full h-full">
          <div className="w-full flex mb-4 justify-end">
            <Button variant="ghost" onClick={() => zoomIn()}>Zoom In</Button>
            <Button variant="ghost" onClick={() => zoomOut()} className="btn">Zoom Out</Button>
            <Button variant="ghost" onClick={() => resetTransform()} className="btn">Reset</Button>
          </div>
          <TransformComponent wrapperClass="w-full h-full">
            <div className="relative w-full h-full bg-red-500 opacity-80">
              <PuzzlePiece/>
              <PuzzlePiece/>
              {/* Ajoute autant de pièces que nécessaire */}
            </div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

const PuzzlePiece = () => {
  return (
    <Draggable>
      <div className="puzzle-piece w-24 h-24 bg-blue-500 absolute cursor-grab">Piece</div>
    </Draggable>
  );
};

export default PuzzleBoard;