import React, { createContext, useContext } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import SocketService from "./SocketService";
import { Form, Formik } from "formik";
import { InputField } from "./components/InputField";

export const App = () => {
  const ChatContext: React.Context<SocketService> = createContext(
    new SocketService()
  );
  const socket: SocketService = useContext(ChatContext);
  socket.connect();

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values) => socket.message(values.message)}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="message"
                    placeholder="message"
                    label="Message"
                  />
                  <Button
                    mt={4}
                    type="submit"
                    colorScheme="teal"
                    textColor="white"
                    variant="solid"
                    isLoading={isSubmitting}
                  >
                    Send
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
