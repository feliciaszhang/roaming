import { io, Socket } from 'socket.io-client';

export default class SocketService {
  private socket: Socket = {} as Socket;

  public connect(): SocketService {
    console.log('initiating socket service')
    this.socket = io('http://localhost:8080/', {
        withCredentials: true,
        });
    return this;
  }

  // send a message for the server to broadcast
  public message(message: string): void {
    console.log('emitting message: ' + message);
    this.socket.emit('message', message);
  }

  // disconnect - used when unmounting
  public disconnect(): void {
    this.socket.disconnect();
  }
}