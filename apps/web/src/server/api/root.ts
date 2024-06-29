import {authedProcedure, createCallerFactory, createTRPCRouter, publicProcedure} from "./trpc";
import {roomRouter} from "./room";
import { updateUsernameSchema } from "./schemas";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => "ok"),
  me: publicProcedure.query(async ({ctx}) => {
    return {user : ctx.user }
  }),
  updateUserName: authedProcedure.input(updateUsernameSchema).mutation(async ({ctx, input}) => {
    await ctx.db.user.update({
      where: {
        id: ctx.user!.id
      },
      data: {
        name: input.username
      }
    })
    return {
      success: true
    }
  }),
  room: roomRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);