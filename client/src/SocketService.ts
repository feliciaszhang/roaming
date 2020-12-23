import { io, Socket } from "socket.io-client";

export default class SocketService {
  private socket: Socket = {} as Socket;
  private room: string;

  constructor(room: string) {
    this.room = room;
  }

  public subscribe(room: string) {
    console.log("Initiating socket service");
    this.socket = io("http://localhost:8080/", {
      withCredentials: true,
    });
    this.socket.emit("subscribe", this.room);
    console.log("Client %s subscripted to room: %s" , this.socket.id, this.room);

    this.socket.on("message", (m: string) => {
      console.log("Received message from server: %s", m);
    });
  }

  public message(message: string): void {
    console.log("Client %s emitted message: %s", this.socket.id, message);
    this.socket.emit("message", message);
  }

  public disconnect(): void {
    console.log("Client %s disconneced", this.socket.id);
    this.socket.disconnect();
  }
}
