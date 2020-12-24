import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import {
  Text,
  theme,
  ListItem,
  List,
  Box,
  useColorMode,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { Message } from "../types";
import { useFetchUser } from "../pages/_app";

type MessageItemProps = InputHTMLAttributes<HTMLInputElement> & {
  messageItem: Message;
};

export const MessageItem: React.FC<MessageItemProps> = ({ messageItem }) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const {sessionUser, loading} = useFetchUser();
  const me: boolean = sessionUser.nickname === messageItem.from;

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Flex width="100%">
      {me ? <Spacer /> : null}
      <VStack align={me ? "flex-end" : "flex-start"}>
        <Box
          borderRadius="lg"
          background={
            colorMode === "dark"
              ? me
                ? theme.colors.gray[700]
                : theme.colors.teal[600]
              : me
              ? theme.colors.gray[100]
              : theme.colors.teal[300]
          }
          p={4}
          flexGrow={1}
          ml={me ? 20 : 0}
          mr={me ? 0 : 20}
        >
          <Text fontSize="xl" ref={messageRef} overflowWrap="anywhere">{messageItem.message}</Text>
        </Box>
        <Text fontSize="xs" ref={messageRef}>{messageItem.from}</Text>
      </VStack>
      {!me ? <Spacer /> : null}
    </Flex>
  );
};
