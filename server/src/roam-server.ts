import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from "cors";
import { Message } from './model';

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
          let room: string;
          console.log("Connected client %s on port %s.", socket.id, this.port);

          socket.on('subscribe', (r: string) => { 
            console.log('Client %s joined room %s', socket.id, r);
            room = r
            socket.join(room); 
        })

          socket.on("message", (m: Message) => {
            console.log("Received message from %s: %s", m.from, m.message);
            this.io.in(room).emit("message", m)
          });
    
          socket.on("disconnect", () => {
            console.log("Client %s disconnected", socket.id);
            socket.leave(room)
          });
        });
      }

    public getApp(): express.Application {
        return this.app
    }
}