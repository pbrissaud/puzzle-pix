import sharp from "sharp";

export const fetchImage = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch image');
  }
  return await res.arrayBuffer();
}


export const calculatePieceSize = (width: number, height: number, pieces: number) => {
  const aspectRatio = width / height;
  const piecesPerColumn = Math.round(Math.sqrt(pieces / aspectRatio));
  const piecesPerRow = Math.round(pieces / piecesPerColumn);

  const pieceWidth = Math.floor(width / piecesPerRow);
  const pieceHeight = Math.floor(height / piecesPerColumn);

  const actualPieces = piecesPerRow * piecesPerColumn;

  return {pieceWidth, pieceHeight, actualPieces, piecesPerRow, piecesPerColumn};
}

export const cutImageIntoPieces = async (imageBuffer: ArrayBuffer, pieceWidth: number, pieceHeight: number, piecesPerRow: number, piecesPerColumn: number) => {
  const piecesData = [];
  const {width, height} = await sharp(imageBuffer).metadata();

  let id = 0;

  for (let row = 0; row < piecesPerColumn; row++) {
    for (let col = 0; col < piecesPerRow; col++) {
      const x = col * pieceWidth;
      const y = row * pieceHeight;
      const extractWidth = pieceWidth;
      const extractHeight = pieceHeight;

      if (x + extractWidth <= width! && y + extractHeight <= height!) {
        const piece = await sharp(imageBuffer)
          .extract({left: x, top: y, width: extractWidth, height: extractHeight})
          .toBuffer();
        const newPosX = Math.floor(Math.random() * width!);
        const newPosY = Math.floor(Math.random() * height!);
        piecesData.push({
          order: Buffer.from(id.toString()).toString('base64'),
          posX: newPosX,
          posY: newPosY,
          imgBuffer: piece.toString('base64')
        });
        id++;
      }
    }
  }
  return piecesData;
}
