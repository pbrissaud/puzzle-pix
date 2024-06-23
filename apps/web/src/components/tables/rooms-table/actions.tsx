"use client"
import {Room} from "@repo/db";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@ui/components/ui/dropdown-menu";
import {Button} from "@ui/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {api} from "../../../trpc/react";
import {useRouter} from "next/navigation";
import {useToast} from "../../../hooks/use-toast";
import useSocket from "../../../hooks/use-socket";

const RoomsDataTableActions = ({room}: { room: Room & { players: number } }) => {
  const router = useRouter();
  const socket = useSocket();
  const {toast} = useToast();
  const {mutate: deleteRoom} = api.room.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Room deleted",
        description: "The room has been deleted",
      });
      socket?.emit("room-deleted", room.id);
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleDeleteRoom = () => {
    toast({
      title: "Deleting room",
      description: "The room is being deleted",
    })
    deleteRoom({roomId: room.id});
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/room/${room.id}`)}>
          Copy link to room
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteRoom}>Delete room</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RoomsDataTableActions;