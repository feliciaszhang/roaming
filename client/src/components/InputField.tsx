import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes, KeyboardEvent } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  handleKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input
        {...field}
        id={field.name}
        placehold={props.placeholder}
        type={props.type}
        onKeyPress={
          props.handleKeyPress ? (e) => props.handleKeyPress(e) : null
        }
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
