import React, { createContext, useRef } from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";

function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
