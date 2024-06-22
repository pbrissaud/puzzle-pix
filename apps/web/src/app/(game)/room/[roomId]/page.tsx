import RoomScreen from "../../../../components/room-screen";
import {Suspense} from "react";
import {api} from "../../../../trpc/server";

const RoomPage = async ({params}: { params: { roomId: string } }) => {
  const room = await api.room.get({roomId: params.roomId});
  return (
      <Suspense fallback={"Loading ..."}>
        <RoomScreen room={room}/>
      </Suspense>
  )
};

export default RoomPage;