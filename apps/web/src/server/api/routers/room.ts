import {authedProcedure, createTRPCRouter, publicProcedure} from "../trpc";
import {byRoomId} from "../schemas/common";
import {playerRouter} from "./player";
import {pieceRouter} from "./piece";
import {createRoomSchema} from "../schemas/room";
import sharp from "sharp";
import {calculatePieceSize, cutImageIntoPieces, fetchImage} from "../../utils";
import db from "../../mongo";
import {analytics} from "../../analytics";
import {revalidatePath} from "next/cache";
import {TRPCError} from "@trpc/server";

export const roomRouter = createTRPCRouter({
  listPublic: publicProcedure.query(async ({ctx}) => {
    const res = await ctx.db.room.findMany({
      where: {
        public: true
      },
      orderBy: {
        creationDate: "desc"
      },
      include: {
        players: true
      }
    })

    return res.map(room => ({
      ...room,
      players: room.players.length
    }))
  }),
  listMine: authedProcedure.query(async ({ctx}) => {
    const res = await ctx.db.room.findMany({
      where: {
        author: {
          email: ctx.user!.email
        }
      },
      include: {
        players: true
      }
    })
    return res.map(room => ({
      ...room,
      players: room.players.length
    }))
  }),
  get: publicProcedure.input(byRoomId).query(({ctx, input}) => {
    return ctx.db.room.findUniqueOrThrow({
      where: {
        id: input.roomId
      }
    })
  }),
  create: authedProcedure.input(createRoomSchema).mutation(async ({ctx, input}) => {
    const imageBuffer = await fetchImage(input.imgUrl);
    const {width, height} = await sharp(imageBuffer).metadata();

    const {
      pieceWidth,
      pieceHeight,
      actualPieces,
      piecesPerRow,
      piecesPerColumn
    } = calculatePieceSize(width!, height!, input.nbPieces);
    const piecesData = await cutImageIntoPieces(imageBuffer, pieceWidth, pieceHeight, piecesPerRow, piecesPerColumn);

    const room = await db.room.create({
      data: {
        ...input,
        author: {
          connect: {
            email: ctx.user!.email
          }
        },
        nbPieces: actualPieces,
        pieces: {
          create: piecesData
        }
      }
    });

    analytics.capture({
      event: "room_created",
      distinctId: ctx.user!.id,
      properties: {public: input.public, roomId: room.id}
    })
    revalidatePath("/rooms")
    return {
      roomId: room.id
    }
  }),
  delete: authedProcedure.input(byRoomId).mutation(async ({ctx, input}) => {
    // verify that the user is the author of the room
    const room = await ctx.db.room.findUniqueOrThrow({
      where: {
        id: input.roomId
      },
      include: {
        author: true
      }
    })

    if (room.authorId !== ctx.user?.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You're allowed to perform this action"
      })
    }

    await ctx.db.room.delete({
      where: {
        id: input.roomId
      },
    })

    revalidatePath("/rooms")
    revalidatePath("/profile/my-rooms")

    analytics.capture({
      event: "room_deleted",
      distinctId: ctx.user.id,
      properties: {roomId: input.roomId}
    })

    return {
      success: true
    }
  }),
  player: playerRouter,
  piece: pieceRouter
})