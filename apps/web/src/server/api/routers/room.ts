import {authedProcedure, createTRPCRouter, publicProcedure} from "../trpc";
import {byRoomId} from "../schemas/common";
import {playerRouter} from "./player";

export const roomRouter = createTRPCRouter({
  listPublic: publicProcedure.query(({ctx}) => {
    return ctx.db.room.findMany({
      where: {
        public: true
      },
      include: {
        players: true
      }
    })
  }),
  listMine: authedProcedure.query(({ctx}) => {
    return ctx.db.room.findMany({
      where: {
        authorId: ctx.user.id
      },
      include: {
        players: true
      }
    })
  }),
  get: publicProcedure.input(byRoomId).query(({ctx, input}) => {
    return ctx.db.room.findUniqueOrThrow({
      where: {
        id: input.roomId
      }
    })
  }),
  player: playerRouter
})