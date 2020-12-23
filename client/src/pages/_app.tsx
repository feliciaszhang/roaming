import React, { createContext, useRef } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Flex,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useSocket } from "../useSocket";
import { SendField } from "../components/SendField";
import { MessageList } from "../components/MessageList";

export const App = () => {
  const { messageList, sendMessage } = useSocket("12");
  const footer = useRef<HTMLInputElement>(null);
  let isDark: boolean = true;

  const handleSendMessage = (values: { message: string }) => {
    sendMessage(values.message);
  };

  const handleToggleColor = (_isDark: boolean) => {
    isDark = _isDark;
    footer.current.style.background = isDark? theme.colors.gray[800] : "white"
  };

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3} paddingBottom="90px">
          <DarkModeSwitch handleToggleColor={handleToggleColor} />
          <VStack spacing={8}>
            <Flex width="100%" alignItems="flex-start" overflow="hidden">
              <MessageList messageList={messageList} />
            </Flex>
            <Flex
              ref={footer}
              bottom={0}
              position="fixed"
              display="block"
              width="100%"
            >
              <SendField handleSendMessage={handleSendMessage} />
            </Flex>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
