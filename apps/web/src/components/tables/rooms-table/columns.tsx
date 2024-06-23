"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Room} from "@repo/db";
import {format} from 'date-fns';
import {Button} from "@ui/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import RoomsDataTableActions from "./actions";
import Link from "next/link";
import ZoomableImage from "../../room/zoomable-image";


export const columns: ColumnDef<Room & { players: number }>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({row}) => {
      const data = row.original as Room & { players: number };
      return (
        <div className="space-x-1.5 flex">
          <Button variant="link" asChild className="px-0 font-bold">
            <Link href={`/room/${data.id}`}>{data.name}</Link>
          </Button>
          <div className="flex items-center">
            <span>(</span>
            <ZoomableImage src={data.imgUrl} alt={data.name}>
              <Button variant="link" className="px-0 font-normal text-foreground">View image</Button>
            </ZoomableImage>
            <span>)</span>
          </div>
        </div>
      )
    }
  },
  {
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Players
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    accessorKey: "players",
  },
  {
    accessorKey: "nbPieces",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nb pieces
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "creationDate",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({cell}) => {
      const date: number = cell.getValue() as number;
      const formatted = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
      return <div className="font-medium">{formatted}</div>;
    },
  }

]

export const columnsWithAction: ColumnDef<Room & { players: number }>[] = [
  ...columns,
  {
    id: "actions",
    cell: ({row}) => {
      const room = row.original
      return <RoomsDataTableActions room={room}/>
    },
  },
]