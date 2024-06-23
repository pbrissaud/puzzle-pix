"use client";

import {useEffect} from "react";
import {Room} from "@repo/db";
import {Button} from "@ui/components/ui/button";
import {useRouter} from "next/navigation";
import {useToast} from "../../hooks/use-toast";
import {ImageIcon, LogOutIcon} from "lucide-react";
import useSocket from "../../hooks/use-socket";
import RoomStats from "./room-stats";
import Leaderboard from "./leaderboard";
import {api} from "../../trpc/react";
import {useQueryClient} from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import PuzzleBoard from "../puzzle/board";
import 'react-loading-skeleton/dist/skeleton.css'
import ZoomableImage from "./zoomable-image";

const RoomScreen = ({room}: { room: Room }) => {
    const socket = useSocket();
    const router = useRouter();
    const {toast} = useToast();
    const queryClient = useQueryClient();

    const {data: players} = api.room.player.list.useQuery({roomId: room.id}, {
        staleTime: 10 * 1000,
        refetchInterval: 10 * 1000,
    });

    useEffect(() => {
        if (socket) {
            socket.emit("room-join", room.id);

            socket.on("player-update", () => {
                queryClient
                  .invalidateQueries({queryKey: [["room", "player"], {input: {roomId: room.id}, type: "query"}]})
                  .then();
            });

            socket.on("room-deleted", () => {
                toast({
                    title: "Room deleted",
                    description: "The room has been deleted",
                });
                router.push("/rooms");
            });

            return () => {
                socket.off("room-join");
                socket.off("player-update");
            };
        }
    }, [socket, room]); // Add game._id as a dependency

    const handleDisconnect = () => {
        if (socket) {
            socket?.disconnect();
        }
        router.push("/rooms");
    }


    const handleCopyRoomLink = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/room/${room.id}`).then(() => {
            toast({
                title: "Share Link copied",
                description: "The link to the room has been copied to your clipboard",
            })
        })
    }

    if (!socket) {
        return <div>Connecting...</div>
    }

    return (
      <div className="grid grid-cols-6 h-[calc(100vh-60px)]">
          <div className="flex flex-col justify-between border-r-2 min-w-fit">
              <div className="flex-col space-y-4">
                  <div className="p-4 border-b-2 justify-center">
                      <h1 className="text-xl font-medium text-center">{room.name}</h1>
                      <RoomStats playerCount={players?.length || 0} maxPlayers={room.maxPlayers}
                                 nbPieces={room.nbPieces} creationDate={room.creationDate}/>
                      <div className="flex flex-col justify-center space-y-2 mt-4">
                          <ZoomableImage src={room.imgUrl} alt={room.name}>
                              <Button variant="outline">
                                  <ImageIcon className="mr-2 h-4 w-4"/>View image
                              </Button>
                          </ZoomableImage>
                          <Button variant="link" onClick={handleCopyRoomLink}>Copy link to room</Button>
                      </div>
                  </div>
                  <div className="text-md px-3">
                      {players ? (
                        <Leaderboard players={players.players || []} socket={socket}/>
                      ) : (
                        <Skeleton count={3}/>
                      )}
                  </div>
              </div>
              <div className="p-4 text-center">
                  <Button onClick={handleDisconnect} size={"lg"}>
                      <LogOutIcon className="mr-2 h-4 w-4"/>Leave room
                  </Button>
              </div>
          </div>

          <div className="col-span-5 h-full p-0.5">
              <PuzzleBoard roomId={room.id} socket={socket}/>
          </div>
      </div>
    );
};

export default RoomScreen;