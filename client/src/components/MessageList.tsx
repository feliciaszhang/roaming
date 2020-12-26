import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { Box, Button, ListItem, List } from "@chakra-ui/react";
import { MessageItem } from "./MessageItem";
import { Message } from "../types";
import { useSession } from "next-auth/client";

type MessageListProps = InputHTMLAttributes<HTMLInputElement> & {
  messageList: Message[];
  typing: { isTyping: boolean; from: string };
};

export const MessageList: React.FC<MessageListProps> = ({
  messageList,
  typing,
}) => {
  const [session, loading] = useSession();
  return (
    <List
      spacing={5}
      marginLeft={20}
      marginRight={20}
      marginTop={2}
      marginBottom={5}
      width="100%"
    >
      {messageList.map((message, i) => (
        <ListItem key={i}>
          <MessageItem messageItem={message} />
        </ListItem>
      ))}
      {typing.isTyping && typing.from !== session.user.email ? (
        <MessageItem typing={typing} />
      ) : null}
    </List>
  );
};
