import {z} from "zod"

const roomCreationBaseSchema = z.object({
  name: z.string().min(5, 'Room name must be at least 5 characters long'),
  public: z.boolean(),
  nbPieces: z.number().min(10, 'Number of pieces must be at least 10').max(1000, 'Number of pieces must be at most 1000'),
  maxPlayers: z.number().min(1, 'Max players must be at least 1').max(10, 'Max players must be at most 10'),
})

export const roomCreationFormSchema = roomCreationBaseSchema.extend({
  images: z.array(z.instanceof(File)),
})

export const roomCreationActionSchema = roomCreationBaseSchema.extend({
  imgUrl: z.string().url(),
})

export type RoomCreationForm = z.infer<typeof roomCreationFormSchema>
export type RoomCreationAction = z.infer<typeof roomCreationActionSchema>