import {z} from "zod";

export const byRoomId = z.object({
  roomId: z.string()
})