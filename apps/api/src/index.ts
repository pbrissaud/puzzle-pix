import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {Db, MongoClient, ObjectId} from "mongodb";

const port = process.env.PORT || 3001;

const url = 'mongodb://localhost:27017';
const dbName = 'puzzlepix';
let db: Db;

MongoClient.connect(url).then((client) => {
  db = client.db(dbName);
  console.log('Connected to database');
}).catch((error) => {
  console.error(error);
})

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Function to generate a random name
const generateRandomName = () => {
  const names = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'];
  return names[Math.floor(Math.random() * names.length)];
};

io.on('connection', (socket) => {
  socket.on("room-join", async (channel) => {
    console.log("Client joined room", channel);
    socket.join(channel);

    // Add player to MongoDB
    const player = {
      name: generateRandomName(),
      socketId: socket.id,
      role: "player"
    };

    await db.collection('games').updateOne(
        {_id: new ObjectId(channel)},
        {$push: {players: player}}
    );

    const game = await db.collection('games').findOne({_id: new ObjectId(channel)});

    if (!game) {
      console.error("Game not found");
      return;
    }

    const clientCountInRoom = game.players.length;

    // Emit the event to all clients in the room
    io.to(channel).emit("room-nb-players", clientCountInRoom);
  });

  socket.on("disconnecting", async () => {
    console.log("Client disconnecting");
    for (const channel of socket.rooms) {
      if (channel !== socket.id) {
        await db.collection('games').updateOne(
            {_id: new ObjectId(channel)},
            {$pull: {players: {socketId: socket.id}}}
        );

        const game = await db.collection('games').findOne({_id: new ObjectId(channel)});
        if (!game) {
          console.error("Game not found");
          return;
        }

        const clientCountInRoom = game.players.length;
        io.to(channel).emit("room-nb-players", clientCountInRoom);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});