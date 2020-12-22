import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import {Message} from './model'

export class ChatServer {
    public static readonly PORT:number = 8080
    private app: express.Application
    private httpServer: http.Server
    private io: Server
    private port: string | number

    constructor() {
        this.app = express()
        this.port = process.env.PORT || ChatServer.PORT;
        this.httpServer = http.createServer(this.app)
        this.io = new Server(this.httpServer)
        this.listen()
    }

    private listen(): void {
        this.httpServer.listen(this.port, () => {
          console.log("Running server on port %s", this.port);
        });
    
        this.io.on("connect", (socket: Socket) => {
          console.log("Connected client on port %s.", this.port);
          socket.on("message", (m: Message) => {
            console.log("[server](message): %s", JSON.stringify(m));
            this.io.emit("message", m);
          });
    
          socket.on("disconnect", () => {
            console.log("Client disconnected");
          });
        });
      }

    public getApp(): express.Application {
        return this.app
    }
}