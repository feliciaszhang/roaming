import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { Text, Button, ListItem, List } from "@chakra-ui/react";
import { Message } from "../types";

type MessageItemProps = InputHTMLAttributes<HTMLInputElement> & {
  messageItem: Message;
};

export const MessageItem: React.FC<MessageItemProps> = ({messageItem}) => {
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  })

  return (
    <>
    <Text ref={messageRef}>{messageItem.message}</Text>
    <Text ref={messageRef}>{messageItem.from}</Text>
    </>
  );
};
