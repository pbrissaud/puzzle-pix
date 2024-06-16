import GameScreen from "../../../../components/game-screen";
import clientPromise from "../../../../server/mongo";
import {Game, GameDocument} from "../../../../types/game";
import {Suspense} from "react";
import {ObjectId} from "mongodb";

const getGame = async (gameId: string) => {
  const client = await clientPromise;
  const db = client.db();
  const query = {_id: new ObjectId(gameId)};
  const document = await db.collection<GameDocument>("games").findOne(query);
  if (!document) {
    throw new Error("Game not found");
  }
  const game: Game = {
    _id: document._id.toHexString(),
    name: document.name,
    public: document.public,
    createdAt: new Date(document.createdAt),
    img: document.img,
    slots: document.slots,
    players: document.players,
    author: document.author,
    nbPieces: document.nbPieces,
  }
  return game;
}

const GamePage = async ({params}: { params: { gameId: string } }) => {
  const game = await getGame(params.gameId);
  return (
      <Suspense fallback={"Loading ..."}>
        <GameScreen game={game}/>
      </Suspense>
  )
};

export default GamePage;