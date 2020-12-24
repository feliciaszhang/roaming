import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, Switch, theme, IconButton } from "@chakra-ui/react";
import React from "react";

export const DarkModeSwitch: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const bgColor: string = isDark
    ? theme.colors.gray[700]
    : theme.colors.gray[200];

  return (
    <IconButton
      aria-label="ToggleColorMode"
      bg={bgColor}
      onClick={toggleColorMode}
      icon={isDark ? <SunIcon w={6} h={6} /> : <MoonIcon w={6} h={6} />}
    />
  );
};
