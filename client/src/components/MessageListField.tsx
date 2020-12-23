import React, { InputHTMLAttributes } from "react";
import { InputField } from "./InputField";
import { Form, Formik } from "formik";
import { Box, Button, ListItem, List } from "@chakra-ui/react";

type MessageListFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  messageList: string[];
};

export const MessageListField: React.FC<MessageListFieldProps> = ({
  messageList,
}) => {
  return (
    <List spacing={5}>
      {messageList.map((message, i) => (
        <ListItem>{message}</ListItem>
      ))}
    </List>
  );
};
