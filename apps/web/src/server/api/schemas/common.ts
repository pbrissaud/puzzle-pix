import {z} from "zod";

export const byRoomId = z.object({
  roomId: z.string()
})

export const byPieceId = z.object({
  pieceId: z.string()
})