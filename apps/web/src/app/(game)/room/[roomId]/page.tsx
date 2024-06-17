import RoomScreen from "../../../../components/room-screen";
import {Suspense} from "react";
import db from "../../../../server/mongo";

const getRoom = async (roomId: string) => {
  return db.room.findUniqueOrThrow({
    where: {
      id: roomId
    },
    include: {
      players: true
    }
  })
}

const RoomPage = async ({params}: { params: { roomId: string } }) => {
  const room = await getRoom(params.roomId);
  // check if room is full
  const isFull = room.maxPlayers === room.players.length
  return (
      <Suspense fallback={"Loading ..."}>
        <RoomScreen room={room} isFull={isFull}/>
      </Suspense>
  )
};

export default RoomPage;