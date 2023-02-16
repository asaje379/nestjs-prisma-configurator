export const websocketTypings = `
import { Socket } from 'socket.io';

export interface IConnectedSocketUsers {
  socket: Socket;
  userId?: string;
}

export interface IWSEmitArgs<T> {
  event: string;
  value: T;
}
`;
