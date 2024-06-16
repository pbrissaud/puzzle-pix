"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Game} from "../../../types/game";
import Link from "next/link";
import {format} from 'date-fns';
import {Button} from "@ui/components/ui/button";
import {ArrowUpDown} from "lucide-react";


export const columns: ColumnDef<Game>[] = [
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Players",
        cell: ({row}: { row: any }) => {
            const data = row.original as Game;
            return <span>{data.players.length}/{data.slots}</span>;
        }
    },
    {
        header: "Image",
        cell: ({row}: { row: any }) => {
            const data = row.original as Game;
            return <Link href={data.img} passHref type="_blank"><img src={data.img} alt={data.name}
                                                                     className="aspect-video h-20"/></Link>;
        }
    },
    {
        accessorKey: "nbPieces",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nb pieces
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
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