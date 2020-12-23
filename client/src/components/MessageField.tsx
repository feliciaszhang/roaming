import React, { InputHTMLAttributes } from "react";
import { InputField } from "../components/InputField";
import { Form, Formik } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";

type MessageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  handleSendMessage: ({ message: string }) => void;
};

export const MessageField: React.FC<MessageFieldProps> = (
  props: MessageFieldProps
) => {
  return (
    <Box width="100%">
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          props.handleSendMessage(values);
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
              />
              <Button
                mt={4}
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
