import {createTRPCRouter, publicProcedure} from "../trpc";
import {byRoomId} from "../schemas/common";

export const playerRouter = createTRPCRouter({
  list: publicProcedure.input(byRoomId).query(async ({ctx, input}) => {
    const players = await ctx.db.player.findMany({
      where: {
        roomId: input.roomId
      }
    })
    return {
      players,
      length: players.length
    }
  })
})