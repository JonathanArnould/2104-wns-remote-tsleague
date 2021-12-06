import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

type Position = {
  positionX: string;
  positionY: string;
};

type Player = {
  socketId: string;
  position: Position;
  direction: string;
  connected: boolean;
};

const getRandomPosition = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};


const updatePlayersPosition = async (players: Player[], socketId: string, payload: any ): Promise<Player[]> => {
  return players.map((player: Player) => {
    if (player.socketId === socketId){
      return { ...player, position: { positionX: payload.positionX, positionY: payload.positionY }, direction: payload.direction } 
    }

    return player
    
  });
}

export default function startSocket(): void {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ['*'],
    },
  }).listen(httpServer);

  let players: Player[] = [];

  io.on('connection', (socket: Socket): void => {
    console.log(`connected with id ${socket.id}`);

    socket.emit('currentPlayers', players);

    socket.emit('socketId', socket.id)

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      players = players.filter(player => player.socketId !== socket.id)

      socket.emit('logout', socket.id);
    });

    socket.on('studentPlayer', async (payload: any) => {
      const playerAlreadyExist = players.some(player => player.socketId === socket.id)
      if (!playerAlreadyExist) {
        players.push({
          socketId: socket.id,
          position: {
            positionX: payload.positionX,
            positionY: payload.positionY
          },
          direction: payload.direction,
          connected: true,
        })
      }
      
      players = await updatePlayersPosition(players, socket.id, payload)

      socket.broadcast.emit('newPlayers', players);
    });
  });

  console.log('Socket server started at port 5050');
  httpServer.listen(5050);
}
