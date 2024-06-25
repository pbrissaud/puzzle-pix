import React, {Suspense} from "react";
import {api} from "../../../../trpc/server";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@ui/components/ui/card";
import {RoomsDataTable} from "../../../../components/tables/rooms-table/data-table";
import {columnsWithAction} from "../../../../components/tables/rooms-table/columns";

const MyRoomsListPage = async () => {
  const games = await api.room.listMine();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your rooms</CardTitle>
        <CardDescription>Manage your rooms</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <RoomsDataTable data={games} columns={columnsWithAction}/>
        </Suspense>
      </CardContent>
    </Card>
  )
}

export default MyRoomsListPage;