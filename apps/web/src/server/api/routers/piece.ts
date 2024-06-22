import {createTRPCRouter, publicProcedure} from "../trpc";
import {byPieceId, byRoomId} from "../schemas/common";

export const pieceRouter = createTRPCRouter({
  list: publicProcedure.input(byRoomId).query(async ({ctx, input}) => {
    return ctx.db.piece.findMany({
      where: {
        roomId: input.roomId
      }
    })
  }),
  get: publicProcedure.input(byPieceId).query(async ({ctx, input}) => {
    return ctx.db.piece.findUniqueOrThrow({
      where: {
        id: input.pieceId
      }
    })
  }),
})