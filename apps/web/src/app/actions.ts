"use server";

import clientPromise from "../server/mongo";
import {CreateGameSchema, createGameSchema} from "../types/game-creation";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export const createGame = async (data: CreateGameSchema) => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        redirect("/api/auth/login")
    }
    const client = await clientPromise;
    const db = client.db();
    const {name, isPublic, img, slots, nbPieces} = createGameSchema.parse(data);
    const res = await db.collection("games").insertOne({
        name,
        public: isPublic,
        img,
        slots,
        nbPieces,
        author: user.id,
        players: [],
        createdAt: new Date(),
    });

    revalidatePath("/games")
    redirect(`/game/${res.insertedId}`)
}