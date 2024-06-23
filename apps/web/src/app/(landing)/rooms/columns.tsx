"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Room} from "@repo/db";
import {format} from 'date-fns';
import {Button} from "@ui/components/ui/button";
import {ArrowUpDown} from "lucide-react";


export const columns: ColumnDef<Room & { players: number }>[] = [
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Players",
        cell: ({row}: { row: any }) => {
            const data = row.original as Room & { players: number };
            return <span>{data.players}/{data.maxPlayers}</span>;
        }
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