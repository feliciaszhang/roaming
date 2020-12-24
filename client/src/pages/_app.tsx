import React, { createContext, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Box, ChakraProvider, theme, Grid } from "@chakra-ui/react";
import { User } from "../types";

export const UserListContext = createContext<{
  userList: Set<string>;
  setUserList: (user: string) => void;
}>(null);


let userState: User
const SessionUser = React.createContext({ sessionUser: null, loading: false })

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState
  }

  const res = await fetch('/api/me')
  userState = res.ok ? await res.json() : null
  return userState
}
export const UserProvider = ({ value, children }) => {
  const { sessionUser } = value

  // If the user was fetched in SSR add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && sessionUser) {
      userState = sessionUser
    }
  }, [])

  return <SessionUser.Provider value={value}>{children}</SessionUser.Provider>
}

export const useUser = () => React.useContext(SessionUser)

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    sessionUser: userState || null,
    loading: userState === undefined,
  })

  React.useEffect(() => {
    if (userState !== undefined) {
      return
    }

    let isMounted = true

    fetchUser().then(sessionUser => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ sessionUser, loading: false })
      }
    })

    return () => {
      isMounted = false
    }
  }, [userState])

  return data
}


function App({ Component, pageProps }: any) {
  const { sessionUser, loading } = useFetchUser()
  const userList = new Set<string>()
  const setUserList = (user: string) => {
    userList.add(user)
  };

  return (
    <UserProvider value={{ sessionUser, loading }}>
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
    </UserProvider>
  );
}

export default App;
