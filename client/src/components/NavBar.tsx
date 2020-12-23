import { Box, Button, Flex, theme } from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import NextLink from "next/link";

export const NavBar: React.FC<{}> = () => {
  return (
    <Flex
      p={5}
      background="tomato"
      top={0}
      position="fixed"
      display="block"
      width="100%"
    >
      <Flex align="flex-end">
        <Box mr={2}>SomeName</Box>
        <Button variant="link">Sign out</Button>
        <DarkModeSwitch />
      </Flex>
    </Flex>
  );
};
