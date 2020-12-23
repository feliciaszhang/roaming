import React, { InputHTMLAttributes } from "react";
import { InputField } from "../components/InputField";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";

type MessageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  handleSendMessage: ({message: string}) => void
};

export const MessageField: React.FC<MessageFieldProps> = (props: MessageFieldProps) => {
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        props.handleSendMessage(values)
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="message" placeholder="message" label="Message" />
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
  );
};
