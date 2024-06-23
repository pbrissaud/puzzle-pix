import {z} from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(5, 'Room name must be at least 5 characters long'),
  public: z.boolean(),
  nbPieces: z.number().min(100, 'Number of pieces must be at least 10').max(1000, 'Number of pieces must be at most 1000'),
  imgUrl: z.string().url(),
})

export type CreateRoom = z.infer<typeof createRoomSchema>