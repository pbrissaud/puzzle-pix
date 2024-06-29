import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {PlayerRole, PrismaClient} from "@repo/db";
import {faker} from '@faker-js/faker';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ]
});

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

io.on('connection', (socket) => {
  const socketLogger = logger.child({socketId: socket.id});
  socket.on("room-join", async (channel, playerName?) => {
    socketLogger.info('Client joining room', {
      roomId: channel
    });
    socket.join(channel);

    if (!playerName) {
      playerName = faker.internet.userName();
    }

    // Add player to MongoDB
    await db.player.upsert({
      where: {
        socketId: socket.id
      },
      create: {
        name: playerName,
        socketId: socket.id,
        room: {
          connect: {
            id: channel
          }
        },
        role: PlayerRole.PLAYER,
      },
      update: {},
    });

    io.in(channel).emit("player-update");
  });

  socket.on("player-name-change", async (name) => {
    try {
      const player = await db.player.update({
        where: {
          socketId: socket.id
        },
        data: {
          name
        }
      });
      socketLogger.info(`Client changing name to ${name}`, {
        roomId: player.roomId
      });
      io.in(player.roomId).emit("player-update");
    } catch (e: any) {
      if (e.code === 'P2002') {
        socketLogger.error("Name already taken");
        io.in(socket.id).emit("error", "Name already taken");
      } else {
        socketLogger.error(e.message);
        io.in(socket.id).emit("error", e.message);
      }
    }
  })

  socket.on("piece-move-start", async (pieceId) => {
    const roomId = socket.rooms.values().next().value;
    socketLogger.info(`Client moving piece`, {
      pieceId,
      roomId
    });
    const res = await db.piece.update({
      where: {
        id: pieceId
      },
      data: {
        movable: false
      }
    });
    io.to(roomId).emit("piece-update", res);
  });

  socket.on("piece-move-stop", async (pieceId, {posX, posY}) => {
    const roomId = socket.rooms.values().next().value;
    socketLogger.info(`Client stopped moving piece`, {
      pieceId,
      roomId,
      posX,
      posY
    });
    const res = await db.piece.update({
      where: {
        id: pieceId
      },
      data: {
        movable: true,
        posX,
        posY
      }
    });
    io.to(roomId).emit("piece-update", res);
  });

  socket.on("disconnecting", async () => {
    for (const channel of socket.rooms) {
      socketLogger.info(`Client disconnecting`, {
        roomId: channel
      });
      if (channel !== socket.id) {
        try {
          await db.player.delete({
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
          io.to(channel).emit("player-update");
        } catch (e) {
          logger.error(e);
        }
      }
    }
  });

  socket.on("disconnect", async () => {
    for (const channel of socket.rooms) {
      socketLogger.info(`Client disconnected`, {
        roomId: channel
      });
      if (channel !== socket.id) {
        try {
          await db.player.delete({
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
          io.to(channel).emit("player-update");
        } catch (e) {
          logger.error(e);
        }

      }
    }
  });

  socket.on("room-deleted", async (roomId) => {
    socketLogger.info(`Room deleted`, {
      roomId
    });
    io.to(roomId).emit("room-deleted");
  })
});

server.listen(port, () => {
  logger.info(`server running at http://localhost:${port}`);
});