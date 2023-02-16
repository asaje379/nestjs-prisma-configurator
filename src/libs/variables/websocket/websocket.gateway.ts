export const websocketGateway = `
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IConnectedSocketUsers, IWSEmitArgs } from './websocket.typings';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  connectedUsers: IConnectedSocketUsers[] = [];

  handleConnection(client: Socket) {
    console.log('user-connected');
    const userInfo = this.connectedUsers.find(
      (cu: IConnectedSocketUsers) => cu.socket.id === client.id,
    );
    if (!userInfo) this.connectedUsers.push({ socket: client, userId: '' });
  }

  handleDisconnect(client: Socket) {
    console.log('user-disconnected');
    this.connectedUsers = this.connectedUsers.filter(
      (cu: IConnectedSocketUsers) => cu.socket.id === client.id,
    );
  }

  joinRoomByUser(room: string, userId: string) {
    const userInstance = this.connectedUsers.find(
      (cu: IConnectedSocketUsers) => cu.userId === userId,
    );
    userInstance.socket.join(room);
  }

  joinRoomBySocket(room: string, socketId: string) {
    const userInstance = this.connectedUsers.find(
      (cu: IConnectedSocketUsers) => cu.socket.id === socketId,
    );
    console.log(userInstance, socketId);
    userInstance.socket.join(room);
  }

  notifyRoom(id: string, data: IWSEmitArgs<any>) {
    this.server.to(id).emit(data.event, data.value);
  }

  broadcast(data: IWSEmitArgs<any>) {
    console.log('Event emmited:', data);
    this.server.emit(data.event, data.value);
  }

  @SubscribeMessage('register-user')
  registerUser(
    @MessageBody('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userInfo = this.connectedUsers.find(
      (cu: IConnectedSocketUsers) => cu.socket.id === client.id,
    );
    if (userInfo) {
      userInfo.userId = userId;
    }
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.joinRoomBySocket(room, client.id);
  }
}
`;
