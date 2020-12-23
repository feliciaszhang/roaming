import React, { createContext, useRef } from "react";
import { NavBar } from "../components/NavBar";
import { Box, ChakraProvider, theme, Grid } from "@chakra-ui/react";

function App({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
        <Box fontSize="xl">
          <Grid minH="100vh" paddingTop="90px" paddingBottom="90px">
            <Component {...pageProps} />
          </Grid>
        </Box>
    </ChakraProvider>
  );
}

export default App;
