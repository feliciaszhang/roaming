import React, { createContext, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Box, ChakraProvider, theme, Grid } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

export const UserListContext = createContext<{
  userList: Set<string>;
  setUserList: (user: string) => void;
}>(null);

function App({ Component, pageProps }: any) {
  const userList = new Set<string>()
  const setUserList = (user: string) => {
    userList.add(user)
  };

  return (
    <Provider session={pageProps.session}>
      <UserListContext.Provider value={{ userList, setUserList }}>
        <ChakraProvider theme={theme}>
          <NavBar />
          <Box>
            <Grid minH="100vh" paddingTop="90px" paddingBottom="90px">
              <Component {...pageProps} />
            </Grid>
          </Box>
        </ChakraProvider>
      </UserListContext.Provider>
    </Provider>
  );
}

export default App;
