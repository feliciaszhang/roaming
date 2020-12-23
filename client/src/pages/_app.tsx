import React, { createContext, useContext } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react";
import {DarkModeSwitch} from '../components/DarkModeSwitch'
import SocketService from '../SocketService'
import { MessageField } from "../components/MessageField";
import { MessageListField } from "../components/MessageListField";

export const App = () => {
  const ChatContext: React.Context<SocketService> = createContext(
    new SocketService("12")
  );
  const socket: SocketService = useContext(ChatContext);
  socket.subscribe("12");

  const handleSendMessage = (values: { message: string; }) => {
    socket.message(values.message);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <DarkModeSwitch />
          <VStack spacing={8}>
            <MessageListField />
            <MessageField handleSendMessage={handleSendMessage}/>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
