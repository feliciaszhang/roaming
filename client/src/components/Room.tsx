import { Box, VStack, Grid, theme, Flex, useColorMode } from "@chakra-ui/react";
import { useSocket } from "../useSocket";
import { SendField } from "./SendField";
import { MessageList } from "./MessageList";

const Room: React.FC<{ room: string }> = ({ room }) => {
  const { messageList, sendMessage } = useSocket(room);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSendMessage = (values: { message: string }) => {
    sendMessage(values.message);
  };

  return (
    <VStack spacing={8}>
      <Flex width="100%" alignItems="flex-start" overflow="hidden">
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
