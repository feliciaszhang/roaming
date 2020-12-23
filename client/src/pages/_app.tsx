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
import { InputField } from "../components/InputField";
import { Form, Formik } from "formik";

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
          <DarkModeSwitch />
          <VStack spacing={8}>
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values, {setSubmitting, resetForm}) => {
                socket.message(values.message)
                setSubmitting(false)
                resetForm()
              }}
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
