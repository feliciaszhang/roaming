import React, { createContext, useRef } from "react";
import { NavBar } from "../components/NavBar";
import { Box, ChakraProvider, theme, Grid } from "@chakra-ui/react";
import { Provider } from 'next-auth/client'

function App({ Component, pageProps }: any) {
  return (
    <Provider session={pageProps.session}>
    <ChakraProvider theme={theme}>
      <NavBar />
        <Box fontSize="xl">
          <Grid minH="100vh" paddingTop="90px" paddingBottom="90px">
            <Component {...pageProps} />
          </Grid>
        </Box>
    </ChakraProvider>
    </Provider>
  );
}

export default App;
