import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import {Message} from './model'
import cors from "cors";

export class ChatServer {
    public static readonly PORT:number = 8080
    private app: express.Application
    private httpServer: http.Server
    private io: Server
    private port: string | number

    constructor() {
        this.app = express()
        this.app.use(
          cors({
              origin: "http://localhost:3000",
              credentials: true
          }))
        this.port = process.env.PORT || ChatServer.PORT;
        this.httpServer = http.createServer(this.app)
        this.io = new Server(this.httpServer, {
          cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
          }
        });
        this.listen()
    }

    private listen(): void {
        this.httpServer.listen(this.port, () => {
          console.log("Running server on port %s", this.port);
        });
    
        this.io.on("connect", (socket: Socket) => {
          socket.join("room1")
          console.log("Connected client %s on port %s.", socket.id, this.port);

          socket.on("message", (m: Message) => {
            console.log("Received message from %s: %s", socket.id, JSON.stringify(m));
            this.io.in("room1").emit("message", "server says hi")
          });
    
          socket.on("disconnect", () => {
            console.log("Client %s disconnected", socket.id);
            socket.leave("room1")
          });
        });
      }

    public getApp(): express.Application {
        return this.app
    }
}