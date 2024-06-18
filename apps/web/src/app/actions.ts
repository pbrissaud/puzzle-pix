"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import db from "../server/mongo";
import {RoomCreationAction, roomCreationActionSchema} from "../types/room-creation";


export const createRoom = async (data: RoomCreationAction) => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        redirect("/api/auth/login")
    }
  roomCreationActionSchema.parse(data)
  const res = await db.room.create({
    data: {
      ...data,
      authorId: user.id
    }
    });

  revalidatePath("/rooms")
  redirect(`/room/${res.id}`)
}