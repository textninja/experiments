const http = require('http');
const server = http.createServer();
const { Server } = require('socket.io');
const crypto = require('node:crypto');

function randomid() {
  const options = 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ23456789';
  return new Array(16).fill(0)
    .map(() => options[Math.random() * options.length | 0])
    .join('');
}

const io = new Server(
  server,
  {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || 'https://chat.localhost',
      methods: ['GET', 'POST']
    }
  }
);

class ConnectionsManager {
  connections = [];

  constructor(io) {
    this.io = io;

    io.on('connection', socket => {
      this.connections.push(socket);
      io.emit('participants.count.updated', this.connections.length);
      socket.on('participants.count.get', (cb) => {
        if (typeof cb === 'function') {
          cb(this.connections.length);
        }
      });
      socket.on('disconnect', () => {
        this.connections = this.connections.filter(connection => connection !== socket);
        io.emit('participants.count.updated', this.connections.length);
      });
    });
  }
}

class RoomsManager {
  rooms = [];

  constructor(io) {
    this.io = io;

    io.on('connection', socket => {
      socket.on('rooms.get', cb => {
        if (typeof cb === 'function') {
          cb(this.rooms.map(room => this.#processRoom(room)));
        }
      });

      socket.on('room.create', cb => {
        const id = randomid();

        const room = {
          id: id,
          name: id,
          participants: new Set
        };

        this.#addRoom(room);

        if (typeof cb === "function") {
          cb(this.#processRoom(room));
        }
      });

      socket.on('room.join', (roomId) => {
        const room = this.rooms.find(room => room.id === roomId);
        if (room && !room.participants.has(socket)) {
          room.participants.add(socket);
          this.#emitRoomsUpdateEvent();
        }
      });

      socket.on('room.leave', (roomId) => {
        const room = this.rooms.find(room => room.id === roomId);
        if (room && room.participants.has(socket)) {
          room.participants.delete(socket);
          this.#emitRoomsUpdateEvent();
        }
      });
    });
  }

  getRoom(roomId) {
    const room = this.rooms.find(room => room.id === roomId);
    if (!room) return null;
    return this.#processRoom(room);
  }

  getParticipants(roomId) {
    const room = this.rooms.find(room => room.id === roomId);
    if (!room) return null;
    return room.participants;
  }

  #removeRoom(room) {
    this.rooms = this.rooms.filter(r => r.id !== room.id);
    this.#emitRoomsUpdateEvent();
  }

  #addRoom(room) {
    this.rooms.push(room);
    this.#emitRoomsUpdateEvent();
    return room;
  }

  #emitRoomsUpdateEvent() {
    this.io.emit('rooms.updated', this.rooms.map(room => this.#processRoom(room)));
  }

  #processRoom(room) {
    return {
      id: room.id,
      participantsCount: room.participants.size
    };
  }
}

class ChatManager {
  roomChats = {};

  constructor(io, roomsManager) {
    this.io = io;
    this.roomsManager = roomsManager;

    io.on('connection', socket => {
      socket.on('chat.messages.get', (roomId, cb) => {
        if (typeof cb !== 'function') return;
        cb(this.getRoomChats(roomId));
      });

      socket.on('chat.message.create', (message) => {
        const chatRoom = this.roomsManager.getRoom(message.room);
        if (!chatRoom) return;

        this.roomChats[chatRoom.id] ||= [];

        this.roomChats[chatRoom.id].push({
          id: crypto.randomUUID(),
          room: chatRoom.id,
          created: new Date().getTime(),
          author: socket,
          message: String(message.message)
        });

        for (const participant of this.roomsManager.getParticipants(chatRoom.id)) {
          participant.emit('chat.messages.updated', chatRoom.id, this.getRoomChats(chatRoom.id));
        }
      });
    });
  }

  getRoomChats(roomId) {
    const chats = this.roomChats[roomId] || [];
    return chats.map(chat => ({
      id: chat.id,
      author: chat.author.id,
      created: chat.created,
      message: String(chat.message)
    }));
  }
}

new ConnectionsManager(io);
const roomsManager = new RoomsManager(io);
new ChatManager(io, roomsManager);

server.listen(50001, () => {
  console.log('Socket.io listening on http://localhost:50001')
});
