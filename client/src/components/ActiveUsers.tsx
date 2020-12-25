import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes, useRef } from "react";
import { MessageItem } from "./MessageItem";

type ActiveUsersProps = InputHTMLAttributes<HTMLInputElement> & {
  names: string[];
};

export const ActiveUsers: React.FC<ActiveUsersProps> = ({ names }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Active Users
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Active Users</DrawerHeader>
            <DrawerBody>
            <List spacing={2}>
              {names.map((name, i) => (
                <ListItem key={i}>{name}</ListItem>
              ))}
            </List>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default ActiveUsers;
