import {z} from "zod"

export const createGameSchema = z.object({
    name: z.string().min(5),
    isPublic: z.boolean(),
    img: z.string().url(),
    slots: z.number(),
    nbPieces: z.number(),
})

export const createGameFormSchema = createGameSchema.omit({img: true}).extend({
    image: z.array(z.instanceof(File))
})

export type CreateGameSchema = z.infer<typeof createGameSchema>

export type CreateGameFormSchema = z.infer<typeof createGameFormSchema>