import { io, Socket } from "socket.io-client";
import { useRef, useEffect, useState, useContext } from "react";
import { Message, User } from "./types";
import { useSession } from "next-auth/client";
import { useToast } from "@chakra-ui/react";
import { UserListContext } from "./pages/_app";

export const useSocket = (
  room: string
): {
  messageList: Message[];
  sendMessage: (message: Message) => void;
  typing: { isTyping: boolean; from: string };
  showTyping: (from: string) => void;
} => {
  const [session, loading] = useSession();
  const toast = useToast();
  const [messageList, setMessageList] = useState<Array<Message>>([]);
  const [typing, setTyping] = useState<{ isTyping: boolean; from: string }>({
    isTyping: false,
    from: "",
  });
  const socketRef = useRef<Socket>(null);
  const { userList, setUserList } = useContext(UserListContext);
  let timeout = undefined;

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/"
        : "https://roaming-server.herokuapp.com/";
    socketRef.current = io(url, {
      withCredentials: true,
    });

    socketRef.current.emit("subscribe", { room: room, user: session.user });
    console.log(
      "Client %s subscripted to room: %s",
      socketRef.current.id,
      room
    );

    socketRef.current.on("typing", (from: string) => {
      setTyping(() => ({ isTyping: true, from: from }));
    });

    socketRef.current.on("notTyping", (from: string) => {
      setTyping(() => ({ isTyping: false, from: from }));
    });

    socketRef.current.on("message", (message: Message) => {
      console.log("Received message from server: %s", message.message);
      setMessageList((messageList) => [...messageList, message]);
    });

    socketRef.current.on("next", (userList: Array<string>) => {
      userList.forEach((user) => setUserList(user));
    });

    socketRef.current.on("first", () => {
      toast({
        title: "Welcome! You are the first one here!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    });

    socketRef.current.on("notification", (user: User) => {
      console.log("%s has joined the chat", user.email);
      if (!userList.has(user.email) && user.email !== session.user.email) {
        toast({
          title: user.email + " has joined the chat",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }
      setUserList(user.email);
    });

    return () => {
      console.log("Client %s disconneced", socketRef.current.id);
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (message: Message): void => {
    console.log(
      "Client %s emitted message: %s",
      socketRef.current.id,
      message.message
    );
    socketRef.current.emit("message", message);
  };

  const timeoutFunction = (from: string) => {
    console.log("User is not typing");
    socketRef.current.emit("notTyping");
  };

  const showTyping = (from: string): void => {
    console.log("%s is typing", from);
    socketRef.current.emit("typing", from);
    if (!typing) {
      clearTimeout(timeout);
      timeout = setTimeout((from) => timeoutFunction(from), 2000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout((from) => timeoutFunction(from), 2000);
    }
  };

  return { messageList, sendMessage, typing, showTyping };
};
