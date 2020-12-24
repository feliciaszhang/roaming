import { Box, VStack, Grid, theme, Flex, useColorMode } from "@chakra-ui/react";
import { useSocket } from "../useSocket";
import { SendField } from "../components/SendField";
import { MessageList } from "../components/MessageList";
import { signin, signout, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Room: React.FC<{}> = () => {
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

export default Room;
