import { Box, VStack, theme, Flex, useColorMode } from "@chakra-ui/react";
import { useSocket } from "../useSocket";
import { SendField } from "../components/SendField";
import { MessageList } from "../components/MessageList";
import { useRouter } from "next/router";
import { NextPage } from "next";
import withAuth from "../withAuth";
import { getSession, useSession } from "next-auth/client";
import { KeyboardEvent } from "react";

const Room: NextPage<{}> = () => {
  const router = useRouter();
  const room: string =
    typeof router.query.room === "string" ? router.query.room : "";
  const { messageList, sendMessage, typing, showTyping } = useSocket(room);
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSendMessage = (values: { message: string }) => {
    sendMessage({ message: values.message, from: session.user.email });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      showTyping(session.user.email);
    }
  };

  return (
    <VStack spacing={8}>
      <Flex overflow="hidden" width="100%">
        <MessageList messageList={messageList} typing={typing} />
      </Flex>
      <Flex
        bottom={0}
        position="fixed"
        display="block"
        width="100%"
        background={colorMode === "dark" ? theme.colors.gray[800] : "white"}
      >
        <SendField
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </Flex>
    </VStack>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/api/auth/signin" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default withAuth(Room);
