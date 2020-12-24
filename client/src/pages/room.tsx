import { Box, VStack, Grid, theme, Flex, useColorMode } from "@chakra-ui/react";
import { useSocket } from "../useSocket";
import { SendField } from "../components/SendField";
import { MessageList } from "../components/MessageList";
import { useRouter } from "next/router";
import { useFetchUser } from "./_app";

const Room: React.FC<{}> = () => {
  const router = useRouter()
  const room: string = (typeof (router.query.room) === 'string') ? router.query.room : ""
  const { messageList, sendMessage } = useSocket(room);
  const {sessionUser, loading} = useFetchUser();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSendMessage = (values: { message: string }) => {
    sendMessage({message: values.message, from: sessionUser.nickname});
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
