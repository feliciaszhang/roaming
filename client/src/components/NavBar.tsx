import {
  Box,
  Button,
  Flex,
  HStack,
  theme,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import NextLink from "next/link";

export const NavBar: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      p={5}
      background={
        colorMode === "dark" ? theme.colors.gray[700] : theme.colors.gray[200]
      }
      top={0}
      position="fixed"
      display="block"
      width="100%"
    >
      <Flex align="center" justifyContent="flex-end">
        <HStack spacing={4}>
          <Box>SomeName</Box>
          <Button variant="link">Sign out</Button>
          <DarkModeSwitch />
        </HStack>
      </Flex>
    </Flex>
  );
};
