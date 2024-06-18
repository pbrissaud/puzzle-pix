import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {PlayerRole, PrismaClient} from "@repo/db";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3001;

const app = express();
const db = new PrismaClient();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Function to generate a random name
const generateRandomName = () => {
  return "Player_" + Math.floor(Math.random() * 1000);
};

io.on('connection', (socket) => {
  socket.on("room-join", async (channel, callback) => {
    console.log("Client joined room", channel);
    socket.join(channel);

    const randomName = generateRandomName();

    // Add player to MongoDB
    const player = await db.player.create({
      data: {
        name: randomName,
        socketId: socket.id,
        room: {
          connect: {
            id: channel
          }
        },
        role: PlayerRole.PLAYER,
      },
      include: {
        room: {
          select: {
            players: true
          }
        }
      }
    });

    io.to(channel).emit("room-nb-players", player.room.players.length);

    callback(randomName)
  });

  socket.on("disconnecting", async () => {
    console.log("Client disconnecting");
    for (const channel of socket.rooms) {
      if (channel !== socket.id) {

        const removedPlayer = await db.player.delete({
          where: {
            socketId: socket.id
          },
          include: {
            room: {
              select: {
                players: true
              }
            }
          }
        });

        io.to(channel).emit("room-nb-players", removedPlayer.room.players.length);
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