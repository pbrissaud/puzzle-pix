import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../../components/page-header";
import {Button} from "@ui/components/ui/button";
import React, {Suspense} from "react";
import Link from "next/link";
import {RoomsDataTable} from "./data-table";
import {columns} from "./columns";
import db from "../../../server/mongo";


const getPublicRooms = async () => {
  return db.room.findMany({
    where: {
      public: true
    },
    include: {
      players: true
    }
  });
}


const RoomListPage = async () => {
  const games = await getPublicRooms();
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
              <Link passHref href="/room/create">
                <Button>Create your own room</Button>
                </Link>
            </PageActions>
        </PageHeader>
            <div className="container mx-auto">
                <Suspense fallback={<div>Loading...</div>}>
                  <RoomsDataTable columns={columns} data={games}/>
                </Suspense>
            </div>
        </>
    )
}

export default RoomListPage;