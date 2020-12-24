import {
  Box,
  Button,
  Flex,
  HStack,
  theme,
  Container,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import NextLink from "next/link";
import { signin, signout, useSession } from "next-auth/client";

export const NavBar: React.FC<{}> = () => {
  const [session, loading] = useSession();
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
          {!session && (
            <NextLink href="/api/auth/signin">
              <Link>Sign in</Link>
            </NextLink>
          )}
          {session && (
            <>
              <Box>{session.user.email}</Box>
              <NextLink href="/api/auth/signout">
                <Link>Sign out</Link>
              </NextLink>
            </>
          )}
          <DarkModeSwitch />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default NavBar;