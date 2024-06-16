import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../../components/page-header";
import {Button} from "@ui/components/ui/button";
import React, {Suspense} from "react";
import Link from "next/link";
import clientPromise from "../../../server/mongo";
import {GamesDataTable} from "./data-table";
import {columns} from "./columns";
import {Game} from "../../../types/game";


const getPublicGames = async () => {
    const client = await clientPromise;
    const db = client.db();
    const games = await db.collection<Game>("games").find({public: true,}).toArray();

    return games.map(game => ({
        ...game,
        _id: game._id.toString()
    }));
}


const GameListPage = async () => {
    const games = await getPublicGames();
    return (
        <>
        <PageHeader>
            <PageHeaderHeading className="hidden md:block">
                Public games
            </PageHeaderHeading>
            <PageHeaderDescription>
                Join a public game or create your own and invite friends to play with you.
            </PageHeaderDescription>
            <PageActions>
                <Link passHref href="/game/create">
                    <Button>Create your own game</Button>
                </Link>
            </PageActions>
        </PageHeader>
            <div className="container mx-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <GamesDataTable columns={columns} data={games}/>
                </Suspense>
            </div>
        </>
    )
}

export default GameListPage;