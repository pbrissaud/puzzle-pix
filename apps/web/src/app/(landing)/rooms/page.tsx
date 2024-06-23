import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../../components/page-header";
import {Button} from "@ui/components/ui/button";
import React, {Suspense} from "react";
import Link from "next/link";
import {api} from "../../../trpc/server";
import {RoomsDataTable} from "../../../components/tables/rooms-table/data-table";
import {columns} from "../../../components/tables/rooms-table/columns";


const RoomListPage = async () => {
  const games = await api.room.listPublic();
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