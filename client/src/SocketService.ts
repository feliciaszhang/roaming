import { io, Socket } from 'socket.io-client';

export default class SocketService {
  private socket: Socket = {} as Socket;

  public connect(): SocketService {
    console.log('Initiating socket service')
    this.socket = io('http://localhost:8080/', {
        withCredentials: true,
        });

    this.socket.on("message", (m: string) => {
      console.log("Received message from server: %s", m);
    })
    return this;
  }

  public message(message: string): void {
    console.log("Client %s emitted message: %s", this.socket.id, message);
    this.socket.emit('message', message);
  }

  public disconnect(): void {
    console.log("Client %s disconneced", this.socket.id);
    this.socket.disconnect();
  }
}