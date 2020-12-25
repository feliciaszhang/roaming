import { Box, VStack, Grid, theme, Flex, useColorMode, propNames } from "@chakra-ui/react";
import { useSocket } from "../useSocket";
import { SendField } from "../components/SendField";
import { MessageList } from "../components/MessageList";
import { getSession, useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import { NextPage, NextPageContext } from "next";

const Room: NextPage<{}> = () => {
  const router = useRouter()
  const room: string = (typeof (router.query.room) === 'string') ? router.query.room : ""
  const { messageList, sendMessage } = useSocket(room);
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSendMessage = (values: { message: string }) => {
    sendMessage({message: values.message, from: session.user.email});
  };

  return (
    <VStack spacing={8}>
      <Flex overflow="hidden" width="100%">
        <MessageList messageList={messageList} />
      </Flex>
      <Flex
        bottom={0}
        position="fixed"
        display="block"
        width="100%"
        background={colorMode === "dark" ? theme.colors.gray[800] : "white"}
      >
        <SendField handleSendMessage={handleSendMessage} />
      </Flex>
    </VStack>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    ctx.res.writeHead(302, { Location: '/api/auth/signin' })
    ctx.res.end()
    return {}
  }

  return {
    props: {
      user: session.user,
    },
  }
}

export default Room;
