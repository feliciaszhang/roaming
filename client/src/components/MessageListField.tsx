import React, { InputHTMLAttributes } from "react";
import { InputField } from "./InputField";
import { Form, Formik } from "formik";
import { Box, Button, ListItem, List } from "@chakra-ui/react";

type MessageListFieldProps = InputHTMLAttributes<HTMLInputElement> & {
};

export const MessageListField: React.FC<MessageListFieldProps> = () => {
  return (
<List spacing={5}>
<ListItem>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </ListItem>
  <ListItem>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </ListItem>
  <ListItem>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </ListItem>
</List>
  );
};
