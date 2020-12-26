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
import { useSession } from "next-auth/client";

type MessageItemProps = InputHTMLAttributes<HTMLInputElement> & {
  messageItem?: Message;
  typing?: { isTyping: boolean; from: string };
};

export const MessageItem: React.FC<MessageItemProps> = ({
  messageItem,
  typing,
}) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const [session, loading] = useSession();
  let me: boolean;
  if (messageItem) {
    me = session.user.email === messageItem.from;
  } else {
    me = session.user.email === typing.from;
  }

  useEffect(() => {
    if (messageItem) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <Flex width="100%">
      {me ? <Spacer /> : null}
      <VStack align={me ? "flex-end" : "flex-start"}>
        {messageItem ? (
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
            <Text fontSize="xl" overflowWrap="anywhere">
              {messageItem.message}
            </Text>
          </Box>
        ) : (
          <Text
            fontSize="xl"
            overflowWrap="anywhere"
            color={
              colorMode === "dark"
                ? theme.colors.gray[500]
                : theme.colors.gray[500]
            }
          >
            Typing...
          </Text>
        )}
        {messageItem ? (
          <Text fontSize="xs" ref={messageRef}>
            {messageItem.from}
          </Text>
        ) : null}
      </VStack>
      {!me ? <Spacer /> : null}
    </Flex>
  );
};
