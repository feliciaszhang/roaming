import {
  Box,
  Button,
  Flex,
  HStack,
  theme,
  useColorMode,
  Link,
  Spacer,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import NextLink from "next/link";
import { BellIcon, CalendarIcon, ChatIcon } from "@chakra-ui/icons";
import { useFetchUser } from "../pages/_app";

export const NavBar: React.FC<{}> = () => {
  const {sessionUser, loading} = useFetchUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor: string =
    colorMode === "dark" ? theme.colors.gray[700] : theme.colors.gray[200];

  return (
    <Flex
      p={4}
      background={bgColor}
      top={0}
      position="fixed"
      display="block"
      width="100%"
    >
      <HStack>
        <HStack spacing={10}>
        <IconButton
          aria-label="Calendar"
          bg={bgColor}
          icon={<CalendarIcon w={6} h={6} />}
        />
        <IconButton
          aria-label="Messages"
          bg={bgColor}
          icon={<ChatIcon w={6} h={6} />}
        />
        <IconButton
          aria-label="Notifications"
          bg={bgColor}
          icon={<BellIcon w={6} h={6} />}
        />
        </HStack>
        <Spacer />
        <Flex align="center" justifyContent="flex-end">
          <HStack spacing={4}>
            {!sessionUser && (
              <NextLink href="/api/login">
                <Link>Sign in</Link>
              </NextLink>
            )}
            {sessionUser && (
              <>
                <Avatar
                  size="xs"
                  name={sessionUser.name}
                  src={sessionUser.picture}
                />
                <NextLink href="/api/auth/signout">
                  <Link>Sign out</Link>
                </NextLink>
              </>
            )}
            <DarkModeSwitch />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default NavBar;
