import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { Box, Button, ListItem, List } from "@chakra-ui/react";
import { MessageItem } from "./MessageItem";
import { Message } from "../types";

type MessageListProps = InputHTMLAttributes<HTMLInputElement> & {
  messageList: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({messageList}) => {

  return (
    <List spacing={5} m={4} marginBottom={6}>
      {messageList.map((message, i) => (
        <ListItem key={i}>
          <MessageItem messageItem={message}/>
        </ListItem>
      ))}
    </List>
  );
};
