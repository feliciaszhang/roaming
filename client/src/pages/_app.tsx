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
import {useSocket} from '../useSocket'
import { MessageField } from "../components/MessageField";
import { MessageListField } from "../components/MessageListField";

export const App = () => {
  const {messageList, sendMessage} = useSocket("12")

  const handleSendMessage = (values: { message: string; }) => {
    sendMessage(values.message);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <DarkModeSwitch />
          <VStack spacing={8}>
            <MessageListField messageList={messageList}/>
            <MessageField handleSendMessage={handleSendMessage}/>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
