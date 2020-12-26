import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { Message, Subscription } from "./types";

export class ChatServer {
  public static readonly PORT: number = 8080;
  private app: express.Application;
  private httpServer: http.Server;
  private io: Server;
  private port: string | number;
  private map = new Map<string, Set<string>>();

  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.app.use(
      cors({
        origin: process.env.NEXT_PUBLIC_SITE,
        credentials: true,
      })
    );
    this.port = process.env.PORT || ChatServer.PORT;
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_SITE,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    this.listen();
  }

  private listen(): void {
    this.httpServer.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on("connect", (socket: Socket) => {
      let room: string;
      console.log("Connected client %s on port %s.", socket.id, this.port);

      socket.on("subscribe", (subscription: Subscription) => {
        console.log(
          "User %s joined room %s",
          subscription.user.email,
          subscription.room
        );
        room = subscription.room;
        socket.join(room);
        this.io.in(room).emit("notification", subscription.user);
        let userList = this.map.get(subscription.room);
        if (userList !== undefined && userList.size > 0) {
          userList.add(subscription.user.email);
          this.map.set(subscription.room, userList);
          this.io.in(room).emit("next", [...userList.keys()]);
        } else {
          userList = new Set<string>();
          userList.add(subscription.user.email);
          this.map.set(subscription.room, userList);
          this.io.in(room).emit("first");
        }
      });

      socket.on("typing", (from: string) => {
        console.log("%s is typing", from);
        this.io.in(room).emit("typing", from);
      });

      socket.on("notTyping", (from: string) => {
        console.log("%s is not typing", from);
        this.io.in(room).emit("notTyping", from);
      });

      socket.on("message", (m: Message) => {
        console.log("Received message from %s: %s", m.from, m.message);
        this.io.in(room).emit("message", m);
      });

      socket.on("disconnect", () => {
        console.log("Client %s disconnected", socket.id);
        socket.leave(room);
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
