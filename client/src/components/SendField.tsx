import React, { InputHTMLAttributes, KeyboardEvent } from "react";
import { InputField } from "./InputField";
import { Form, Formik } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";

type SendFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  handleSendMessage: ({ message: string }) => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const SendField: React.FC<SendFieldProps> = ({
  handleSendMessage,
  handleKeyPress,
}) => {
  return (
    <Box m={4}>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSendMessage(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex align="flex-end">
              <InputField
                name="message"
                placeholder="message"
                label="Message"
                handleKeyPress={handleKeyPress}
              />
              <Button
                ml={2}
                type="submit"
                colorScheme="teal"
                variant="solid"
                isLoading={isSubmitting}
              >
                Send
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
