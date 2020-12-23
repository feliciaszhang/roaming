import React, { createContext, useContext } from "react";
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

  const handleSendMessage = (values: { message: string }) => {
    sendMessage(values.message);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3} paddingBottom="90px">
          <DarkModeSwitch />
          <VStack spacing={8}>
            <Flex width="100%" alignItems="flex-start" overflow="hidden">
              <MessageList messageList={messageList} />
            </Flex>
            <Flex bottom={0} position="fixed" display="block" width="100%" bg={"gray.800"}>
              <SendField handleSendMessage={handleSendMessage} />
            </Flex>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
