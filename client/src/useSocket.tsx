import { io, Socket } from "socket.io-client";
import { useRef, useEffect, useState } from "react";
import { Message } from "./types";

export const useSocket = (
  room: string
): { messageList: Message[]; sendMessage: (message: Message) => void } => {
  const [messageList, setMessageList] = useState([]);
  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080/", {
      withCredentials: true,
    });

    socketRef.current.emit("subscribe", room);
    console.log("Client %s subscripted to room: %s", socketRef.current.id, room);

    socketRef.current.on("message", (message: Message) => {
      console.log("Received message from server: %s", message)
      setMessageList((messageList) => [...messageList, message])
    });

    return () => {
      console.log("Client %s disconneced", socketRef.current.id);
      socketRef.current.disconnect();
    };
  });

  const sendMessage = (message: Message): void => {
    console.log("Client %s emitted message: %s", socketRef.current.id, message);
    socketRef.current.emit("message", message);
  };

  return { messageList, sendMessage };
};
