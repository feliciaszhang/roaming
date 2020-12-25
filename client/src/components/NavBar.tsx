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
import React, { useContext } from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import NextLink from "next/link";
import { signin, signout, useSession } from "next-auth/client";
import { BellIcon, CalendarIcon, ChatIcon } from "@chakra-ui/icons";
import { UserListContext } from "../pages/_app";
import ActiveUsers from "./ActiveUsers";

export const NavBar: React.FC<{}> = () => {
  const { userList, setUserList } = useContext(UserListContext);
  const [session, loading] = useSession();
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
          <ActiveUsers names={Array.from(userList)} />
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
            {!session && (
              <NextLink href="/api/auth/signin">
                <Link>Sign in</Link>
              </NextLink>
            )}
            {session && (
              <>
                <Avatar
                  size="xs"
                  name={session.user.name}
                  src={session.user.image}
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
